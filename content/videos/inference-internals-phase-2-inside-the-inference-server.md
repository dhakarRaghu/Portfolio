---
title: "Inside an LLM inference server: batching, paged KV cache, chunked prefill and strict mode"
date: 2026-10-03
summary: "Your dashboard is green, and your users still see the text stop in the middle of a sentence. One support agent, ten questions, one concept per chapter."
tags: [llm-inference, batching, paged-attention, chunked-prefill, structured-outputs]
playlist: inference-internals
order: 20
part: "Phase 2"
youtube: ""
duration: "27:31"
thumbnail: "/videos/inference-internals-phase-2.png"
chapters:
  - "0:00 Who froze my stream?"
  - "0:32 Ten questions in two parts"
  - "0:54 Why does your latency depend on other requests?"
  - "3:31 Why does paging fit 18 times more requests?"
  - "6:14 What happens when the blocks run out?"
  - "8:41 Why does one changed character end the cache hit?"
  - "11:05 How many requests can one GPU hold?"
  - "13:51 Part B: decoding and context"
  - "14:09 Why does one long prompt freeze every stream?"
  - "16:54 Who says a strict answer is complete?"
  - "19:15 Accuracy fell 9 points. Who took them?"
  - "21:32 What must cross a compaction word for word?"
  - "24:01 The cap missed and the 400 arrived. What now?"
  - "26:28 Recap: Phase 2"
draft: false
---

Your support agent's dashboard is green, with a median TTFT of 600 ms. But users report that the text stops mid-sentence, and the simulator shows a 764 ms gap between two tokens. What stops one answer while every metric says the service is healthy?

This video teaches ten concepts, and each one answers a question about your support agent. Part A shows how one GPU is shared, and it ends with how many requests the GPU can hold. Part B explains three failures that a green dashboard cannot show, each with its mechanism and its fix.

## 1. Why does your latency depend on other requests?

**One scheduler iteration gives every running request one token, so your latency depends on the rest of the batch.**

### The situation

Your support agent's mean TTFT, the time to the first token, is 870 ms in the morning and 1,700 ms at 3pm. The prompts did not change, so your team plans a retry whenever TTFT passes 1,500 ms.

### The picture

A server never runs one request alone, because it runs a loop over a batch of requests. Prefill is the pass that reads your prompt and makes the first token, and decode is each later pass. Each iteration runs one forward pass over the batch, every decoding request gets one token, and the loop repeats.

### Think it through

Your prompt is the same at 3pm. So why does its first token arrive almost twice as late?

A first thought is that the request was unlucky, so a retry will land on a faster moment.

That is reasonable for network errors, but it misses that the request spent its time waiting in the server's queue.

So the real question is what decides how long a request waits for its first pass.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-2/c1-mechanism.webp" alt="Why does your latency depend on other requests: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. A decode pass reads all the weights once, so 16 requests cost 19.92 ms and one request costs 18.12.
2. Static batching admits nothing new until the slowest request finishes, so finished slots sit idle.
3. Continuous batching admits work on every iteration, so a free slot is refilled on the next step.
4. More arrivals per second make the queue longer, so each request waits longer with the same prompt.

### The number

The course simulator ran 40 requests at 6 per second, and continuous batching cut mean TTFT from 5,357 to 867 ms. At 12 arrivals per second, the same prompts gave 1,674 ms, almost twice as much. One column stays at 764 ms in both runs, the worst gap between two tokens, and Part B explains it.

<img src="/videos/inference-internals-phase-2/c1-number.webp" alt="Why does your latency depend on other requests: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Throughput comes from batch size, and your latency comes from what else is in the batch.
- **The trap.** A retry adds one more request to the same queue, so under load the spike gets worse.
- **Try this.** Run batching_sim.py with rate 12, and compare its mean TTFT with the default run.

*A slot is only half the resource, because the KV memory behind it runs out first. Concept 2 asks why paging fits 18 times more requests.*

## 2. Why does paging fit 18 times more requests?

**Paging reserves only the memory a request needs now, so one GPU holds 253 requests instead of 14.**

### The situation

Your support agent runs llama-3-8b on one 80GB GPU, and 56 GB is left for request memory. Each request holds about 1,800 tokens, and the number that fit decides how long the next one waits.

### The picture

The KV cache holds the keys and values of every token, and every decode step reads it from GPU memory. The simple allocator reserves one continuous region per request, sized for the longest sequence allowed. Paging cuts memory into small equal blocks, and a block table maps each request's positions to free blocks anywhere.

### Think it through

The server does not know how long an answer will be. So how much memory should it reserve for one request?

A first thought is to reserve the longest sequence, so a request can never run out halfway.

That is reasonable, but it misses that most of the reservation stays empty, and no other request can use it.

So the real question is what happens when memory is handed out one small block at a time.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-2/c2-mechanism.webp" alt="Why does paging fit 18 times more requests: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. One token of llama-3-8b costs 128 KB of keys and values across its 32 layers.
2. A reservation of 32,768 tokens costs 4 GB, so the 56 GB pool holds 14 requests.
3. A paged request of 1,800 tokens takes 113 blocks of 16 tokens, about 0.22 GB.
4. The pool then holds 253 requests, and each wastes only 8 slots in its last block.

### The number

The course lab measures 18.1 times more requests with paging, on the same GPU and the same model. The contiguous allocator leaves 52.9 GB reserved and unused, and paging leaves 0.2 GB. The PagedAttention paper saw the same waste in real systems, where only 20 to 38% of KV memory held real tokens.

<img src="/videos/inference-internals-phase-2/c2-number.webp" alt="Why does paging fit 18 times more requests: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Paging reserves what a request needs now, not the most it could ever need.
- **The trap.** A worst-case reservation looks safe, but it leaves 52.9 of 56 GB idle.
- **Try this.** Run paging_lab.py and find the line that reports 18.1 times more requests.

*A fuller pool admits more requests, but it can also run out of free blocks. Concept 3 asks what the server does when the blocks run out.*

## 3. What happens when the blocks run out?

**When blocks run out, the server preempts a running request and redoes its prefill later, so users see a pause.**

### The situation

During a traffic burst, one of your support agent's answers stops for almost two seconds and then continues. Your logs show no error, because you record TTFT and total latency but not the gaps between tokens.

### The picture

Preemption means the scheduler takes the blocks of a running request and gives them to other requests. The request goes back to the waiting queue, and the tokens it already sent stay with the user. Later it is admitted again, and vLLM rebuilds its KV cache by running the prefill again, a mode called RECOMPUTE.

### Think it through

The pool has no free block, and a running request needs one more. What should the server do?

A first thought is an out-of-memory error, because that is what a normal memory allocator returns.

That is reasonable, but it misses that the server can take blocks from a running request, so it chooses a pause.

So the real question is how long that pause lasts, and who can see it.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-2/c3-mechanism.webp" alt="What happens when the blocks run out: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. At 1.2 seconds a burst arrives, and the pool runs out while request R holds 40 blocks.
2. The scheduler preempts R and frees all 40 blocks, so R goes back to the queue.
3. At 2.9 seconds blocks are free again, so R is admitted and its prompt is prefilled a second time.
4. At 3.1 seconds R streams again, so the user saw a pause of 1.9 seconds.

### The number

It becomes a failure when max_num_seqs admits more sequences than the KV pool can hold, so preemption repeats. Each preempted request prefills again and recreates the pressure, so throughput collapses while GPU utilisation stays high. No error is raised, and the documented fix is to lower max_num_seqs, not to add memory.

<img src="/videos/inference-internals-phase-2/c3-number.webp" alt="What happens when the blocks run out: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Running out of blocks causes preemption, not an error, and the prefill is redone later.
- **The trap.** Raising gpu_memory_utilization only moves the threshold, and it can turn preemption into an out-of-memory error.
- **Try this.** Record the longest gap between two tokens of each answer, because only that metric shows the pause.

*Two requests that start with the same tokens can share their first blocks. Concept 4 asks why one changed character at the start ends that sharing.*

## 4. Why does one changed character end the cache hit?

**The prefix cache matches whole blocks from the first token forward, so put what never changes first.**

### The situation

Your support agent's system prompt starts with the current time, so its first line changes on every call. In Phase 1 you measured that one changed character early in a prompt ends the cache hit.

### The picture

The server keeps the KV blocks of prompts it has already computed, in a tree keyed by tokens. A shared system prompt is stored once, and each user's history sits below it. A new request walks down from the root, reuses every block it matches, and stops at the first block that differs.

### Think it through

Only the first line of your 1,200-token prompt changes. So how much of the prompt still hits the cache?

A first thought is that everything after that line still hits, because those blocks are identical.

That is reasonable, but it misses that each block's key includes the hashes of every block before it.

So the real question is where the match stops, and whether it can start again.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-2/c4-mechanism.webp" alt="Why does one changed character end the cache hit: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. Each block's key hashes the previous key and the block's own 16 tokens, so the keys form a chain.
2. Matching starts at block 0 and stops at the first miss, so a change at the top gives every later block a new key.
3. Only full blocks are cached, so a prefix of 1,210 tokens shares 75 blocks, which is 1,200 tokens.
4. When the cache is full, the least recently used blocks leave first, and other users fill the same cache.

### The number

The course simulator sent the same tokens in two orders, and the time-first layout hit 0.0% of them. The time-last layout hit 92.0% and cost 3.22 times less on input, from the order alone. Eviction still applies, so with a cache of 500 blocks, the good layout fell from 93.5% to 68.8%.

<img src="/videos/inference-internals-phase-2/c4-number.webp" alt="Why does one changed character end the cache hit: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Stable content goes first and changing content goes last, because the match runs forward from token 0.
- **The trap.** A cache hit is never guaranteed, so model both prices and alert on the hit rate.
- **Try this.** Run prefix_cache_sim.py and compare the two layouts.

*You now know how requests take blocks and share them, so capacity becomes arithmetic. Concept 5 asks how many requests one GPU can hold.*

## 5. How many requests can one GPU hold?

**You can compute concurrency before you buy hardware, because it is the pool divided by the blocks per request.**

### The situation

Your platform team wants gpu_memory_utilization at 0.70 on the support agent's GPU, for safety. Before you agree, you need the number of requests that each setting lets the GPU hold.

### The picture

The setting is the share of GPU memory the server may use, and the model weights take their part first. What is left becomes the KV pool, cut into blocks, and every running request holds some of them. A shared prefix is stored once, so requests that share it need only their private blocks.

### Think it through

The setting falls from vLLM's default of 0.92 to 0.70. How much of your capacity does that cost?

A first thought is about a quarter, because 0.70 is 76% of 0.92.

That is reasonable, but it misses that the weights stay at 16 GB, so the whole cut comes out of the pool.

So the real question is how big the pool is after the weights.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-2/c5-mechanism.webp" alt="How many requests can one GPU hold: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. At the lab's 0.90, the server may use 72 GB, and the weights take 16, so the pool is 56 GB.
2. One block of 16 tokens at 128 KB each is 2 MB, so the pool holds 28,672 blocks.
3. A request of 1,800 tokens needs 113 blocks, so the pool holds 253 requests.
4. With a shared 1,200-token prefix, each request needs only 38 private blocks, so 752 requests fit.

### The number

Now the setting. At 0.92 the pool holds 260 requests, and at 0.70 it holds 181. The lower setting removes 17.6 GB from the pool, which is 30% of your capacity, not a quarter. The default of 0.92 was read in vLLM 0.29.0, so a tutorial that says 0.90 is out of date.

<img src="/videos/inference-internals-phase-2/c5-number.webp" alt="How many requests can one GPU hold: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** The pool is memory times the setting minus the weights, divided into blocks that requests hold.
- **The trap.** Gpu_memory_utilization looks like a safety setting, but it sets capacity, and 0.70 costs 30%.
- **Try this.** Run paging_lab.py with gpu-util 0.70, and check that 181 requests fit.

*Part A explained whose token runs next and how many requests fit, but not the 764 ms gap. Concept 6 asks why one long prompt freezes every stream.*

## Part B: decoding and context

Part A ended on a gap of 764 ms between two tokens of one answer, and no explanation. Your support agent now fails in three ways that no average shows, and Part B follows each one to its mechanism.

## 6. Why does one long prompt freeze every stream?

**Prefill and decode share one forward pass, so a long prompt freezes every stream unless the server slices it.**

### The situation

Your support agent's dashboard shows a median TTFT of 600 ms and a median total latency of 4.2 s. Every chart is green, but users report that the text stops for about a second mid-sentence.

### The picture

Each iteration runs one forward pass, and that pass can hold prefill work, decode work, or both. Whatever fills the pass decides what every stream gets next, because all the streams wait for it. Chunked prefill splits a long prompt into slices that share one token budget per iteration with the decodes.

### Think it through

A 24,000-token prompt arrives while three streams are mid-answer. Where should the server run its prefill?

A first thought is to run it whole in the next pass, because the new user waits for a first token.

That is reasonable, but it misses that the pass then has no room for decodes, so three streams get zero tokens.

Waiting instead stretches the new TTFT to seconds, so the real question is how one pass can hold both.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-2/c6-mechanism.webp" alt="Why does one long prompt freeze every stream: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. A prefill token costs 0.03 ms, so the whole prompt in one pass takes 720 ms.
2. With chunking, each decoding stream reserves one token of a 2,048-token budget first.
3. The other 2,045 tokens take a slice of the prompt, so the prompt needs 12 iterations.
4. Each iteration takes about 80 ms, so every stream still gets a token every 80 ms.
5. A smaller budget is smoother, but each slice reads the KV of earlier slices again, so the budget has a floor.

### The number

With a 48,000-token prompt, the course run's worst gap fell from 1,460 ms to 81 ms. The price was 112 ms more mean TTFT, and throughput stayed at 3.8 requests per second. On real GPUs, Sarathi-Serve measured the time between tokens rising up to 28.3 times without chunking.

<img src="/videos/inference-internals-phase-2/c6-number.webp" alt="Why does one long prompt freeze every stream: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Reserve the decodes first, then fill the pass with prefill slices.
- **The trap.** Median TTFT and total latency cannot show a 720 ms pause inside one stream.
- **Try this.** Record the longest gap between two tokens in your streaming client, and alert above 500 ms.

*The stream is smooth again, so the lesson moves to your support agent's strict-mode classifier. Concept 7 asks who says that a strict answer is complete.*

## 7. Who says a strict answer is complete?

**A grammar mask decides which tokens are legal, never when generation stops, so keep the finish_reason check.**

### The situation

Your classifier sorts tickets into 12 types and returns JSON with a category and a priority. Strict mode stopped the parser crashes, but on the days with the longest prompts, some answers crash it again.

### The picture

Before each token, the model gives every token in its vocabulary a score, called a logit. Constrained decoding builds a state machine from your schema, and it knows which tokens are legal right now. The grammar mask sets every illegal score to negative infinity, so only a legal token can be picked, and the state moves on.

### Think it through

Every answer follows the schema, yet some crash your parser on long-prompt days. Where do you look first?

A first thought is a bug in the schema or the mask, because strict mode promised valid JSON.

That is reasonable, but it misses that the mask has no input for how many output tokens are left.

So the real question is what happens when the output budget ends before the closing brace.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-2/c7-mechanism.webp" alt="Who says a strict answer is complete: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. At each step the mask checks one thing per token, whether it is valid under the grammar now.
2. An open string is a legal state, so every token inside a long value passes the mask.
3. At max_tokens the server stops the answer, because the budget ends generation and the grammar does not.
4. Your client gets schema-shaped text with no closing braces, and finish_reason says length.

### The number

This holds at all three levels: a prompt only, JSON mode, and a strict JSON schema. Strict mode adds correct keys and legal values, but an answer can still be cut at every level. The Format Tax paper writes the mask as a product of the model's probability and a validity check, with no term for completeness.

<img src="/videos/inference-internals-phase-2/c7-number.webp" alt="Who says a strict answer is complete: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** The mask guarantees legal tokens, and only finish_reason says the answer reached its end.
- **The trap.** Teams delete the finish_reason check when they turn on strict mode, so truncation becomes invisible.
- **Try this.** Log finish_reason next to every parse failure for a week.

*Legal and complete are now two separate checks, but the classifier also lost 9 accuracy points. Concept 8 asks who took those points.*

## 8. Accuracy fell 9 points. Who took them?

**Most of the accuracy cost of structured output is paid at the prompt, so let the model reason first.**

### The situation

Your classifier's JSON is always valid now, but accuracy fell 9 points on the day strict mode went on. One colleague wants to turn constraints off, and another wants a reasoning field, so you need the cause first.

### The picture

There are two suspects, because strict mode changes both the prompt and the decoder. Asking for a format makes the model commit to a label before it writes any reasoning. The mask only removes illegal tokens, and decoding runs left to right, so a field influences only the fields after it.

### Think it through

Accuracy fell 9 points the day strict mode went on. Which suspect took the points?

A first thought is the mask, because the drop started the day the constraint was switched on.

That is reasonable, but it misses that the same switch changed the prompt, and the two costs can be measured apart.

So the real question is how much of the drop appears before any constraint runs.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-2/c8-mechanism.webp" alt="Accuracy fell 9 points. Who took them: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. Run the tickets as free-form answers, so you have a baseline.
2. Ask for the format in the prompt with constraints off, so the gap is the prompt's cost.
3. Turn the mask on, so any further drop is the decoder's share.
4. Put a reasoning field first in the properties, so the label is chosen after the reasoning is written.

### The number

The Format Tax paper ran this split on 6 open-weight models, 3 tasks and 4 formats. Asking for the format cost 3.9 points on average, and the mask on top cost 1.6 more. Of 39 cells with a significant effect, 36 already showed the drop with the prompt alone. Two calls, one to answer and one to reformat, gained 6.8 points on average.

<img src="/videos/inference-internals-phase-2/c8-number.webp" alt="Accuracy fell 9 points. Who took them: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Most of the cost is paid at the prompt, so the reasoning field goes before the labels.
- **The trap.** Turning constraints off buys back only the decoder's share, 1.6 of the paper's average points.
- **Try this.** Rerun one failed ticket as free text, then with the format requested and constraints off.

*One failure is left, a six-hour agent run that ended on a 400 error. Concept 9 asks what must cross a compaction word for word.*

## 9. What must cross a compaction word for word?

**A summary keeps what the summariser found interesting, so standing rules must cross as pinned text.**

### The situation

Your support agent has a standing rule that it must never refund more than 200 euros. Over a six-hour run it makes hundreds of tool calls, and its prompt grows toward the context window.

### The picture

Compaction replaces old turns with a shorter summary, so the prompt fits in the window again. A trigger starts it, a token count below the window that is checked before every call. A language model writes the summary, while the system prompt and the newest turns cross unchanged.

### Think it through

The refund rule sits in an early message, and the trigger fires twice. Where must the rule live to survive until hour five?

A first thought is that the summary keeps it, because a rule about money is clearly important.

That is reasonable, but it misses that summarisers keep the active task, and an old rule makes no new events.

So the real question is which text must cross without a model deciding to keep it.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-2/c9-mechanism.webp" alt="What must cross a compaction word for word: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. The course's compactor fires at 60% of a 32,000-token window, which is 19,200 tokens.
2. At turn 25, 45 old messages become a summary, and the 4 newest are kept word for word.
3. The prompt drops from 19,409 to 2,270 tokens, and the run continues.
4. Pinning copies the standing rules as literal text after every compaction, so no model can drop them.

### The number

The ConstraintRot benchmark ran 1,323 episodes in 7 model families, and a program graded each tool call. When the summary dropped the constraint, 38% of episodes broke the policy. When the constraint survived, violations stayed at 0%, so the cause is deletion, not a long context. Pinning about 47 tokens restored 0% in every model family tested.

<img src="/videos/inference-internals-phase-2/c9-number.webp" alt="What must cross a compaction word for word: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Copy standing rules across every compaction as literal text, never through the summary.
- **The trap.** Trusting the summariser with a rule, because violations went from 0 to 38% when it dropped one.
- **Try this.** Check whether your compactor puts a dropped rule back before the next call.

*One huge tool result can still jump past the trigger and the window in one step. Concept 10 asks what to do when that 400 arrives.*

## 10. The cap missed and the 400 arrived. What now?

**A prompt over the window is rejected the same way every time, so the fix is a smaller input.**

### The situation

Six hours into the run, one tool result is far larger than any before it, and the provider answers 400. A colleague's retry loop catches any exception, sleeps longer each time, and tries three times.

### The picture

A context budget splits the window into zones, one per source of text, and each zone has a cap. The headroom zone stays empty, because the reply and the summarising call both need room. The trigger handles slow growth, and a backstop catches the overflow error after a jump.

### Think it through

The prompt is over the window, and the loop sends it three times. How many attempts succeed?

A first thought is that a later attempt succeeds, because backoff fixes rate limits and busy servers.

That is reasonable, but it misses that the provider checks the input against a fixed window, and waiting does not change the input.

So all three attempts fail, and the real question is what must change before a retry can work.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-2/c10-mechanism.webp" alt="The cap missed and the 400 arrived. What now: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. Check status 400, then code context_length_exceeded, then the type, and the message text last.
2. Log the overflow loudly, because a backstop that fires shows the trigger or the caps are wrong.
3. Compact the history, so the next call sends a different and smaller input.
4. Retry exactly once, because the compacted prompt either fits or your compactor is broken.

### The number

In the course's compactor, a forced overflow at call 5 compacts from 3,849 to 2,270 tokens, and one retry succeeds. A bigger window is not the fix, because a 400,000-token prompt on 50 steps costs $40 at $2 per million tokens. And a context-rot study saw scores fall as input grew, in every model family it tested.

<img src="/videos/inference-internals-phase-2/c10-number.webp" alt="The cap missed and the 400 arrived. What now: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** An overflow 400 is deterministic, so compact the input and retry once.
- **The trap.** Backoff on any exception resends the same prompt, so it fails three times and bills three calls.
- **Try this.** Run compactor.py with inject-overflow 5, and read the backstop lines.

*Each of your support agent's three failures now has a mechanism and a fix. The recap collects the ten claims, and the next phase prices the cache.*

## Recap

- Your latency depends on what else is in the batch.
- Paging reserves what a request needs now, so 253 fit instead of 14.
- Out of blocks means preemption and a pause, not an error.
- The prefix cache matches from token 0, so stable content goes first.
- gpu_memory_utilization sets capacity, and 0.70 costs 30%.
- Slice the prefill, and measure the longest gap between two tokens.
- Strict mode guarantees legal tokens, and finish_reason says the answer is complete.
- Most of the format cost is paid at the prompt, so reasoning goes first.
- Standing rules cross a compaction as pinned text.
- An overflow 400 needs a smaller input and one retry.

## Sources

- [Orca, OSDI 2022 (iteration-level scheduling)](https://www.usenix.org/conference/osdi22/presentation/yu)
- [Anyscale, continuous batching](https://www.anyscale.com/blog/continuous-batching-llm-inference)
- [PagedAttention, SOSP 2023](https://arxiv.org/abs/2309.06180)
- [Fast LLM Serving with vLLM and PagedAttention (talk)](https://www.youtube.com/watch?v=5ZlavKF_98U)
- [vLLM automatic prefix caching design](https://docs.vllm.ai/en/latest/design/prefix_caching.html)
- [SGLang, NeurIPS 2024](https://arxiv.org/abs/2312.07104)
- [Denpex, vLLM preemption-recompute thrash (vendor page)](https://denpex.com/failures/vllm-preemption-recompute-thrash)
- [Keeping vLLM's Prefix Cache Warm Between Agent Turns](https://doug.sh/posts/vllm-kv-cache-agents)
- [Sarathi-Serve, OSDI 2024](https://ar5iv.labs.arxiv.org/html/2403.02310)
- [The Format Tax (2026 preprint)](https://ar5iv.labs.arxiv.org/html/2604.03616)
- [Governance Decay / ConstraintRot (2026 preprint, not peer-reviewed)](https://ar5iv.labs.arxiv.org/html/2606.22528)
- [vLLM v0.29.0 scheduler config](https://raw.githubusercontent.com/vllm-project/vllm/v0.29.0/vllm/config/scheduler.py)
- [vLLM v0.29.0 engine argument utils](https://raw.githubusercontent.com/vllm-project/vllm/v0.29.0/vllm/engine/arg_utils.py)
- [OpenAI structured outputs guide](https://developers.openai.com/api/docs/guides/structured-outputs)
