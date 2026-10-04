---
title: "Why AI Chat Freezes Mid-Sentence"
date: 2026-10-04
summary: "Your support agent's dashboard is green, with a median TTFT of 600 ms, but users see answers stop mid-sentence for almost a second. A batching simulator shows a 764 ms gap between two tokens of one answer. This video finds what stops one answer while every metric says healthy, fixes it, and names the metric that would have caught it."
tags: [chunked-prefill, llm-streaming, time-between-tokens, inter-token-latency, ttft, vllm]
playlist: inference-internals
order: 5
part: "#5"
youtube: ""
duration: "10:08"
thumbnail: "/videos/inference-internals-05.webp"
chapters:
  - "0:00 The freeze the dashboard missed"
  - "0:42 Why does one prompt freeze every stream?"
  - "3:24 How does slicing the prompt remove the freeze?"
  - "6:50 Which number would have caught it?"
  - "9:20 Recap"
draft: false
---

Your support agent's dashboard is green, with a median TTFT, the time to the first token, of 600 ms. But users report that answers stop mid-sentence for almost a second, and then the text continues. A batching simulator replays the traffic, and it shows a 764 ms gap between two tokens of one answer. So what stops one answer while every metric says healthy, and which number would have shown it?

Three questions follow: why one prompt freezes every stream, how slicing it removes the freeze, and which number catches it.

## 1. Why does one prompt freeze every stream?

**Prefill and decode share one forward pass, so one long prompt can stop every answer that is streaming.**

### The situation

Your simulator, a small program that copies the server's scheduler, sends 40 requests at about 6 per second. One carries a 24,000-token prompt, and right after it arrives, 14 streaming answers stop for 764 ms.

### The picture

Each turn of the server's loop runs one forward pass, a single run of the model over the whole batch. Prefill reads a whole prompt before the first token, and decode writes the next token of each streaming answer. Both kinds of work share the pass, so every stream waits for the pass to end.

### Think it through

Another user's 24,000-token prompt arrives while your answer is streaming. Why would that prompt stop your answer?

A first thought is that it cannot, because each request looks like its own call.

That is reasonable from the client side, but the server runs one forward pass for the whole batch.

So the real question is what your stream gets from a pass that holds only the long prefill.

### The mechanism, step by step

<img src="/videos/inference-internals-05/c1-mechanism.webp" alt="The mechanism, as drawn in the video for: Why does one prompt freeze every stream?" width="1280" height="616" loading="lazy" decoding="async" />

1. The simulator charges 0.03 ms per prefill token, and a decode pass 18 ms plus 0.12 ms per stream.
2. Without slicing, the whole prompt goes into the next pass, and that pass holds no decodes.
3. That pass takes 24,000 times 0.03 ms, which is 720 ms, and no stream gets a token.

### The number

In your run the pause was 764 ms, because two more passes followed the long prefill. An 800-token prefill also ran alone for 24 ms, and then a decode pass for 16 streams took 19.92 ms. So 720 plus 24 plus 19.92 gives 764 ms, the gap the simulator showed. On real GPUs, the Sarathi-Serve paper measured time between tokens up to 28.3 times higher with a full prefill in the batch.

<img src="/videos/inference-internals-05/c1-number.webp" alt="The number and its source, as shown in the video for: Why does one prompt freeze every stream?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Prefill and decode share one forward pass, so a long prefill stops every stream in the batch.
- **The trap.** Looking for the cause inside the frozen answer, when another user's prompt filled the pass.
- **Try this.** Find the longest prompt your product sends, because its prefill sets the longest pause it can cause.

The scheduler could instead hold the long prompt until the running answers finish, so the streams stay smooth. But then the new request's TTFT stretches to seconds, so the scheduler needs a pass that holds both kinds of work.

## 2. How does slicing the prompt remove the freeze?

**Chunked prefill slices a long prompt by a token budget, so every pass still carries the decodes.**

### The situation

Take the same 24,000-token prompt, arriving this time while three answers are streaming, so the numbers stay small.

### The picture

The token budget is the most tokens one pass may hold, and vLLM, a serving engine, calls it max num batched tokens. Each pass first reserves one token per streaming answer, and the next slice of the prompt fills the rest.

### Think it through

The budget is 2,048 tokens, and three answers are streaming. How long does each stream now wait between two tokens?

A first thought is still about 720 ms, because slicing removes none of the prompt's work.

That is right about the total, but the work now spreads over many passes, and each pass carries the decodes.

So the real question is how large one slice is, and how long one pass takes.

### The mechanism, step by step

<img src="/videos/inference-internals-05/c2-mechanism.webp" alt="The mechanism, as drawn in the video for: How does slicing the prompt remove the freeze?" width="1280" height="616" loading="lazy" decoding="async" />

1. The three decodes reserve 3 tokens, so 2,045 tokens are left for the slice.
2. 24,000 divided by 2,045 is 11.7, so the prompt needs 12 passes.
3. The slice costs 2,045 times 0.03 ms, which is 61.35 ms.
4. The decodes add 18.36 ms, so one pass takes 79.7 ms, about 80 ms. So each stream gets a token about every 80 ms, and the prefill grows from 720 to about 940 ms.

### The number

Your simulator then ran the original traffic at three budgets, and changed nothing else. Without slicing, the max gap, the longest pause between two tokens of one answer, was 764 ms. At a budget of 8,192 it fell to 265 ms, at 2,048 to 81 ms, and at 512 to 35 ms. Mean TTFT rose instead, from 867 ms without slicing to 925 ms at 2,048 and 1,094 ms at 512. But each extra slice reads the KV cache, the stored attention keys and values, of all earlier slices again. Sarathi-Serve measured up to about 25% overhead from that at 512 on Yi-34B, and almost none at 2,048. So a smaller budget smooths the stream and raises TTFT, and the floor sits near a budget of 512.

<img src="/videos/inference-internals-05/c2-number.webp" alt="The number and its source, as shown in the video for: How does slicing the prompt remove the freeze?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Reserve the decodes first and fill the rest with prompt slices, so no stream waits longer than one pass.
- **The trap.** Pushing the budget toward zero, because below about 512 the repeated KV reads cost throughput.
- **Try this.** Set max num batched tokens yourself, because vLLM 0.29.0 picks 8,192 on an H100 and 2,048 on an A100.

At a budget of 2,048 the max gap fell from 764 to 81 ms, for 58 ms more mean TTFT. But your dashboard showed neither number, so a freeze after the next server change would stay invisible.

## 3. Which number would have caught it?

**A median cannot see a pause inside one answer, so record the max gap of every response.**

### The situation

During the freeze, your dashboard showed a median TTFT of 600 ms and a median total latency of 4.2 s.

### The picture

On one streamed answer, TTFT covers the request to the first token, and total latency covers it to the last. A median is the middle value across all responses, and the freeze is one long pause inside one answer.

### Think it through

One answer in a hundred freezes for 764 ms, and the rest stream smoothly. Why do median TTFT and median total latency stay green?

A first thought is that they should rise, because the freeze adds most of a second.

That is true for one answer, but a median moves only when half the responses move.

And TTFT ends at the first token, so the real question is which number measures the time between tokens.

### The mechanism, step by step

<img src="/videos/inference-internals-05/c3-mechanism.webp" alt="The mechanism, as drawn in the video for: Which number would have caught it?" width="1280" height="616" loading="lazy" decoding="async" />

1. Record each chunk's arrival time in your streaming client, with the clock you use for TTFT.
2. Keep the largest difference between two arrivals, and record it once per response as its max gap.
3. Alert when the max gap goes above 500 ms, which is the text stopping mid-sentence.

### The number

Take one answer of 300 tokens that arrive 25 ms apart, with one pair 800 ms apart. The median time per token stays at 25 ms, but the max gap is 800 ms. On a hosted API the provider owns the budget, so the max gap metric and your prompt size are what you control.

<img src="/videos/inference-internals-05/c3-number.webp" alt="The number and its source, as shown in the video for: Which number would have caught it?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Record the max gap of every response, because a median cannot see a pause inside one answer.
- **The trap.** Trusting a green median TTFT, which stops at the first token and ignores one frozen answer in a hundred.
- **Try this.** Add the max gap lines to your streaming client, and check them against one long answer.

Now the 764 ms gap from the start has a cause, a fix and a metric. A 720 ms prefill caused it, and chunked prefill at a budget of 2,048 brings the max gap to 81 ms. A max gap alert above 500 ms would have fired on that freeze while median TTFT stayed at 600 ms.

## Recap

- Prefill and decode share one forward pass, so a long prefill stops every stream in the batch.
- Chunked prefill slices the prompt by a token budget, and a smaller budget smooths the stream but raises TTFT.
- Record the max gap of every response, because a median cannot see a pause inside one answer.

## Sources

- [Sarathi-Serve, OSDI 2024 (sections 4.2 and 5.4.1)](https://ar5iv.labs.arxiv.org/html/2403.02310)
- [vLLM v0.29.0 scheduler config](https://raw.githubusercontent.com/vllm-project/vllm/v0.29.0/vllm/config/scheduler.py)
- [vLLM v0.29.0 engine arguments (budget resolved per GPU)](https://raw.githubusercontent.com/vllm-project/vllm/v0.29.0/vllm/engine/arg_utils.py)
