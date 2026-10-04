---
title: "Why Long AI Agent Runs Die with a 400"
date: 2026-10-04
summary: "Six hours into an agent run, one tool result is far larger than any before it, and the provider answers 400: the prompt no longer fits the context window. This video answers what must survive a compaction, and what to do when the 400 arrives."
tags: [ai-agents, context-window, context-length-exceeded, compaction, llm-retry, error-400]
playlist: inference-internals
order: 7
part: "#7"
youtube: ""
duration: "7:11"
thumbnail: "/videos/inference-internals-07.webp"
chapters:
  - "0:00 Six hours, then a 400"
  - "0:39 What must cross a compaction word for word?"
  - "3:30 The 400 arrived. What now?"
  - "5:52 How the run survives"
  - "6:28 Recap"
draft: false
---

Your support agent has run for six hours, and it has made hundreds of tool calls on one long task. Then one tool result comes back far larger than any before it, and the provider answers with a 400 error. This 400 means the prompt no longer fits the context window, the most tokens the model accepts in one call. So what must survive when the history gets shortened, and what do you do when the 400 arrives?

Two questions follow: what must survive a compaction, and what to do when the 400 arrives.

## 1. What must cross a compaction word for word?

**A long run stays inside the window by compaction, and your standing rules must cross it as pinned text, not as a summary.**

### The situation

Your agent carries a standing rule, written in an early message, that it must never refund more than 200 EUR. Each loop turn appends messages and tool results, so the prompt grows toward the window on every step.

### The picture

Compaction replaces old turns with a shorter summary, so the prompt fits inside the window again. A trigger starts it, a token count below the window that your code checks before every call. A language model writes the summary, while the system prompt and the newest turns cross unchanged.

### Think it through

The refund rule sits in an early message, and the trigger fires twice. Where must the rule live to survive until hour five?

A first thought is that the summary keeps it, because a rule about money is clearly important.

That is reasonable, but summarisers keep the active task, and an old rule produces no new events.

So the real question is which text must cross without a model deciding to keep it.

### The mechanism, step by step

<img src="/videos/inference-internals-07/c1-mechanism.webp" alt="The mechanism, as drawn in the video for: What must cross a compaction word for word?" width="1280" height="616" loading="lazy" decoding="async" />

1. The lesson's simulator, compactor.py, fires at 60% of a 32,000-token window, which is 19,200 tokens.
2. At turn 25, 45 old messages become one summary, and the 4 newest are kept word for word.
3. The prompt drops from 19,409 to 2,270 tokens, and the run continues.
4. Pinning copies the standing rules as literal text after every compaction, so no model decides to drop them.

### The number

The ConstraintRot benchmark ran 1,323 episodes in 7 model families, and a program graded each tool call. When the summary dropped the rule, 38% of episodes broke the policy. When the rule survived, violations stayed at 0%, so the cause is deletion, not a long context. Soft rules like your refund limit decayed by about 50 points, against about 6 for hard safety rules. Pinning about 47 tokens after each compaction restored 0% in every model family tested.

<img src="/videos/inference-internals-07/c1-number.webp" alt="The number and its source, as shown in the video for: What must cross a compaction word for word?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Copy standing rules across every compaction as literal text, never through the summary.
- **The trap.** Trusting the summariser with a rule, because violations went from 0 to 38% when it dropped one.
- **Try this.** Check whether your compactor puts a dropped rule back before the next call.

Pinning protects your rules across a compaction you planned, the one the trigger starts. But at hour six one tool result is so large that the prompt jumps past the trigger and past the window in one step. Your trigger missed that jump, so the call went out too large, and the provider answered 400.

## 2. The 400 arrived. What now?

**A prompt over the window is rejected the same way every time, so the fix is a smaller input and one retry.**

### The situation

Your agent's client already has a retry loop, which a colleague wrote for rate limits and busy servers. It catches any exception, sleeps longer after each attempt, and tries three times.

### The picture

A context budget splits the window into zones, one per source of text, and each zone has a cap. The headroom zone stays empty, because the reply and the summarising call both need room. The trigger handles slow growth, and a backstop, code that catches the overflow error, handles a jump like this one.

### Think it through

The prompt is over the window, and the loop sends it three times. How many attempts succeed?

A first thought is that a later attempt succeeds, because backoff fixes rate limits and busy servers.

That is reasonable, but the provider checks the input against a fixed window, and waiting does not change the input.

So all three attempts fail, and the real question is what must change before a retry can work.

### The mechanism, step by step

<img src="/videos/inference-internals-07/c2-mechanism.webp" alt="The mechanism, as drawn in the video for: The 400 arrived. What now?" width="1280" height="616" loading="lazy" decoding="async" />

1. Check status 400, then the code context_length_exceeded, then the error type, and the message text last. A 429 or a 5xx error is a busy server, not an overflow, so it keeps the normal backoff.
2. Log the overflow loudly, because a backstop that fires shows that the trigger or the caps are wrong.
3. Compact the history, so the next call sends a different and smaller input.
4. Retry exactly once, because the compacted prompt either fits or your compactor is broken.

### The number

In the simulator, a forced overflow at call 5 compacts the prompt from 3,849 to 2,270 tokens, and one retry succeeds. Its summary counts one backstop, and the next line tells you to lower the trigger ratio. With compaction turned off, the same simulator passes the 32,000-token window at turn 42, and the run stops there.

<img src="/videos/inference-internals-07/c2-number.webp" alt="The number and its source, as shown in the video for: The 400 arrived. What now?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** An overflow 400 is deterministic, so compact the input and retry once.
- **The trap.** Backoff on any exception resends the same prompt, so it fails three times in a row.
- **Try this.** Run compactor.py with inject-overflow 5, and read the backstop lines.

## How the run survives

Back at hour six, the backstop sees status 400 with the overflow code, so it does not wait and resend. It logs the miss, compacts the history, and pins the refund rule again as literal text. The retry sends a smaller prompt that still carries the rule, so the provider accepts it and the run continues. The next morning, that log line tells you to cap the tool-result zone, so one large result is cut before it enters the prompt. Each layer catches what the other misses, the trigger for slow growth and the backstop for one large jump.

## Recap

- Copy standing rules across every compaction as literal pinned text, never through the summary.
- An overflow 400 is deterministic, so compact the input and retry once, never wait and resend.
- Cap every source of text, and fire compaction at a trigger below the window, with headroom left.

## Sources

- [Governance Decay / ConstraintRot (2026 preprint): the compaction violation numbers and the pinning fix](https://ar5iv.labs.arxiv.org/html/2606.22528)
