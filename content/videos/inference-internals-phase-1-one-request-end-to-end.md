---
title: "One LLM request, end to end: tokens, TTFT, the KV cache and decode"
date: 2026-10-03
summary: "Your run log says TTFT 2.1 s, 34 tok/s and $0.004. This video takes one request apart until each number has a cause you can name."
tags: [llm-inference, tokens, ttft, kv-cache, decode]
playlist: inference-internals
order: 10
part: "Phase 1"
youtube: ""
duration: "20:33"
thumbnail: "/videos/inference-internals-phase-1.png"
chapters:
  - "0:00 Which number is yours?"
  - "0:29 One request, six questions"
  - "1:03 Why does the same text cost different amounts of tokens?"
  - "3:53 Where does TTFT come from?"
  - "6:29 What is the KV cache, and what does it limit?"
  - "10:12 Why do output tokens cost more and run slower?"
  - "13:22 Why does temperature 0 not reproduce?"
  - "16:29 How do you measure TTFT, TPOT and cost?"
  - "19:25 Recap: one request, six concepts"
draft: false
---

Your run log shows three numbers for one model call: TTFT 2.1 s, 34 tok/s and $0.004. Which one did your code cause, which one belongs to the provider, and which knob moves each? This video takes one request apart until each number has a cause you can name.

One request passes six stages, and each stage explains a part of your run log. First, why the same text costs different amounts of tokens. Second, where TTFT comes from, and what hides inside it. Third, what the KV cache is, and why it limits how many requests fit on a GPU. Fourth, why output tokens cost more and arrive slower. Fifth, why temperature 0 does not give you the same output twice. And sixth, how you measure TTFT, TPOT and cost yourself, from the outside.

## 1. Why does the same text cost different amounts of tokens?

**You are billed for tokens, and the exchange rate from characters to tokens depends on what the text looks like.**

### The situation

Your run log shows $0.004 for one call, and your cost model estimates tokens from text length. You tested it on English, but half of your real support traffic is in Hindi.

### The picture

A tokenizer cuts your text into tokens, the pieces the model reads and the provider bills. It has a fixed vocabulary of pieces, learned from training data that was mostly English and code. So a common English word is often one token, but other text breaks into more, smaller pieces. This method is called BPE, byte-pair encoding, and each provider uses its own tokenizer.

### Think it through

Your cost model counts tokens as characters divided by 4. How far off is it when half of the traffic is Hindi?

A first thought is that characters divided by 4 works for any text, because it fits English prose well.

That thought is reasonable, but it misses one thing. The vocabulary is mostly English, so Hindi splits into far more pieces.

So the real question is how many characters one token holds for each shape of text you send.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-1/c1-mechanism.webp" alt="Why does the same text cost different amounts of tokens: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. English prose holds about 4 to 4.5 characters per token, because the vocabulary was built for it.
2. Code and JSON drop to about 2 to 3.5, because quotes, braces and indents are tokens too.
3. Hindi holds only about 1 to 2 characters per token, so the same ticket costs 2 to 4 times the tokens.
4. Your agent sends the whole history again on every step, so a long tool result is billed on each step.

### The number

Now the bill. A tool returns 1,000 tokens of pretty-printed JSON on step 1 of a 10-step agent loop. Because the history is sent again, that result is billed ten times by step 10, which is 10,000 tokens. As compact JSON the same result is 600 tokens, so it costs 6,000, and the 4,000 difference is only formatting. Tokenizers also differ between providers. For the same text, Llama 2's tokenizer gives about 19 to 20% more tokens than ChatGPT's and GPT-4's.

<img src="/videos/inference-internals-phase-1/c1-number.webp" alt="Why does the same text cost different amounts of tokens: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** You are billed for tokens, and the exchange rate depends on what the text looks like.
- **The trap.** A tiktoken count is only an estimate, because the provider's tokenizer differs. The server's usage object is the invoice.
- **Try this.** Search your agent for json.dumps with indent=2 where the output goes into a prompt.

*This concept explained the dollars in your log, but not the 2.1 seconds. Concept 2 asks where TTFT comes from.*

## 2. Where does TTFT come from?

**TTFT is queue time plus prefill time, and only the prefill part grows with your prompt.**

### The situation

Your log shows a TTFT of 2.1 seconds for one step of your agent. Over a long agent session that number keeps climbing, while the provider's status page stays green.

### The picture

TTFT, the time to first token, runs from sending the request until the first token comes back. First, your request waits in a queue until the server's scheduler gives it a slot on a GPU. Then prefill sends every prompt token through every model layer in one parallel pass. Prefill ends when the first output token is chosen, and that moment is the end of TTFT.

### Think it through

Your TTFT grows step after step, and the provider says everything is fine. Is that slow start your number or the provider's number?

A first thought is that the provider is slow today, because the wait happens on their servers and their load changes.

That thought is reasonable, but it misses one thing. Your framework appends history every step, so each prompt is longer than the last.

So the real question is whether your input tokens grew together with your TTFT.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-1/c2-mechanism.webp" alt="Where does TTFT come from: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. Receiving, routing and tokenizing take a few milliseconds, so they are never the cause.
2. The queue length changes with the provider's load, not with your prompt.
3. Prefill is compute-bound, so the GPU's math units are the limit, and its time grows roughly with your prompt tokens.
4. From the outside you see only the sum of the two, so you need a second signal to split them.

### The number

Now the failure. Over 25 steps, the step latency creeps from 3 seconds to 11, while the time per output token stays flat. Plot TTFT per step next to input tokens per step. When they grow together, the cause is your growing history. When TTFT jumps while your input length stays flat, the cause is the provider's queue. The fix on your side is to compact or prune the history before each step.

<img src="/videos/inference-internals-phase-1/c2-number.webp" alt="Where does TTFT come from: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** TTFT is queue plus prefill, and you pay prefill on the whole prompt, on every request.
- **The trap.** Saying the model is slow today, when the real change was your own prompt growing.
- **Try this.** Compare the input tokens of the first step and the last step of one long agent session.

*Prefill also writes two vectors per token into GPU memory, and this concept did not say why. Concept 3 asks what the KV cache is.*

## 3. What is the KV cache, and what does it limit?

**The KV cache keeps your prompt in GPU memory, and its size limits how many requests fit on one GPU.**

### The situation

At peak hours your TTFT jumps while your prompt stays the same size, because the provider is queueing you. A provider queues you because its GPUs are full, and this concept shows what fills them.

### The picture

During prefill, every layer computes two vectors per token, called K, the key, and V, the value. Decode needs them at every step, because each new token reads the K and V of all earlier tokens. So the server keeps them in GPU memory instead of computing them again, and that store is the KV cache. The weights are shared by all requests, but each request has its own KV cache, which grows with every token.

### Think it through

One 80 GB H100 serves Llama-3-8B, and the model weights take 16 GB. How many requests with an 8k-token context fit on it at once?

A first thought is that hundreds fit, because the weights are shared and one more request adds little math.

That thought is reasonable, but it misses one thing. Each request keeps its own KV cache, and at 8k tokens it is large.

So the real question is how many bytes one token of KV cache takes.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-1/c3-mechanism.webp" alt="What is the KV cache, and what does it limit: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. Bytes per token is 2, for K and V, times layers, times KV heads, times head size, times bytes per value.
2. Llama-3-8B has 32 layers, 8 KV heads and a head size of 128, at 2 bytes per value in bf16.
3. That gives 128 KB per token, so an 8k-token context takes 1 GB for one request.
4. The card has 80 minus 16, or 64 GB left, so about 64 requests fit before any headroom.
5. vLLM keeps headroom with a default memory share of 0.92, which leaves 57.6 GB, so about 57 requests fit.
6. Attention is causal, which means a token's K and V depend only on the tokens before it.
7. So two requests that start with the same bytes have the same K and V for that shared start, the prefix.
8. The server keeps those blocks and skips their prefill, which is prompt caching, at about 90% off cached input.
9. One changed byte ends the match, so everything after it is prefilled again.
10. A timestamp after an 18k-token system prompt keeps those 18k tokens cached, but a timestamp first caches nothing.

### The number

So one H100 serving this model holds about 57 requests at 8k context, and that is the provider's capacity. It is why the provider queues you at peak time, and batch APIs sell its spare slots at quiet times for about 50% off. Model designers changed attention to shrink this cache. Llama-3-8B shares each KV head among 4 query heads, so its cache is 4 times smaller.

<img src="/videos/inference-internals-phase-1/c3-number.webp" alt="What is the KV cache, and what does it limit: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** The KV cache is where your prompt lives on the GPU, and its memory sets how many requests fit.
- **The trap.** Sending the same system prompt does not guarantee cache hits, because one early changing byte breaks the prefix.
- **Try this.** Open your prompt template and check that timestamps, user text and other changing parts come last.

*Every decode step reads this cache, and this concept did not say what that costs. Concept 4 asks why output tokens cost more.*

## 4. Why do output tokens cost more and run slower?

**Each output token needs a full read of the weights and the KV cache, so output is slow and expensive.**

### The situation

Your log shows 34 tokens per second, which is one output token about every 29 milliseconds. A teammate rewrites the prompt to make answers stream faster, and the 34 does not move.

### The picture

After prefill, a stage called decode writes the answer one token per step. Each step runs the newest token through all layers, reads the whole KV cache, and picks the next token. Then it appends that token's K and V to the cache and starts the next step. The time of one step is called TPOT, the time per output token.

### Think it through

Prefill processes thousands of input tokens per second on this same GPU. So why does decode write only tens of tokens per second?

A first thought is that writing a token is harder math than reading one, because choosing a word sounds hard.

That thought is reasonable, but it misses one thing. The math per step is small, but each step reads the weights and the KV cache from memory.

So the real question is what each decode step waits for.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-1/c4-mechanism.webp" alt="Why do output tokens cost more and run slower: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. Prefill sends 10,000 tokens through the GPU in one parallel pass, so the math units set the limit.
2. Decode reads 16 GB of weights plus the KV cache for each token, so the math units wait for memory.
3. That makes decode bandwidth-bound, so TPOT depends on memory speed and on how many requests share the GPU.
4. So a prompt rewrite cannot make decode faster, but choosing a smaller model can.
5. Output length is your lever, because total time is TTFT plus output tokens times TPOT.
6. At 25 milliseconds per token, every 100 output tokens add 2.5 seconds.

### The number

The price sheet shows the same physics. gpt-4.1 lists $2.00 per million input tokens and $8.00 per million output tokens. That is 4 times, and across providers the output price runs about 3 to 8 times the input price. Reasoning models add hidden output. A model that thinks for 900 tokens to write a 300-token answer bills you for 1,200. So each visible token costs 4 times the sheet price, and max_tokens caps the thinking and the answer together. A small cap can spend everything on thinking, so you get an empty answer and still pay for it.

<img src="/videos/inference-internals-phase-1/c4-number.webp" alt="Why do output tokens cost more and run slower: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Input tokens are processed in parallel, but output tokens are made one by one, so they cost more in dollars and seconds.
- **The trap.** Comparing two models by total latency on one prompt, because their answers have different lengths.
- **Try this.** Run one prompt with max_tokens 40 and then 400, and check that TTFT stays while the total time grows.

*This concept explained how fast each token comes, but not how it is chosen. Concept 5 asks why temperature 0 does not reproduce.*

## 5. Why does temperature 0 not reproduce?

**Temperature 0 removes the randomness you added, but it does not remove the randomness of the machine.**

### The situation

Your CI suite runs the agent at temperature 0 and checks that the output text matches exactly. Ten runs gave ten identical outputs, so the test shipped, and a week later it started to fail.

### The picture

Each decode step ends with a score for every token in the vocabulary, called the logits. Softmax turns the logits into probabilities that add up to 1, and temperature divides the logits first. So a low temperature favors the top token, and a high temperature spreads the choice over more tokens. Top_p keeps only the smallest set of top tokens whose probabilities reach p, and samples inside that set. At temperature 0 the sampler always takes the top token, which is called greedy sampling, or argmax.

### Think it through

At temperature 0 the sampler has no random step at all. So why can two identical requests return different text?

A first thought is that the same input must give the same output, because greedy sampling always picks the same way.

That thought is reasonable, but it misses one thing. Greedy sampling is exact, but the logits it reads are not.

So the real question is what changes the logits between two identical requests.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-1/c5-mechanism.webp" alt="Why does temperature 0 not reproduce: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. Your request runs in a batch with other people's requests, and server load changes the batch size.
2. GPU kernels add numbers in an order that depends on the batch size, in RMSNorm, matrix multiply and attention.
3. Floating-point addition is not associative, so a different order can change the last digits of a sum.
4. The logits move around the 6th decimal place, so when the top two tokens are nearly tied, the top one can change.
5. One changed token early in the answer changes every token after it, because each token feeds the next step.

### The number

Now the measurement. 1,000 completions at temperature 0 from a self-hosted Qwen3-235B gave 80 different outputs. The first difference appeared at token 103, so the answers matched for a while and then split. With batch-invariant kernels, which add in the same order at any batch size, all 1,000 outputs were identical. That costs speed. 1,000 Qwen3-8B sequences took 26 seconds by default, and 42 to 55 seconds with batch-invariant kernels.

<img src="/videos/inference-internals-phase-1/c5-number.webp" alt="Why does temperature 0 not reproduce: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Temperature 0 removes the randomness you added, not the randomness of the machine.
- **The trap.** Ten identical runs do not make a test stable. Check structure and meaning, never exact bytes.
- **Try this.** Check whether your agent sets one temperature for every call, because extraction wants 0 to 0.2 and drafting 0.7 to 1.

*This concept explained how each token is picked, but not how you see it from outside. Concept 6 asks how to measure TTFT, TPOT and cost.*

## 6. How do you measure TTFT, TPOT and cost?

**Stream the response to measure TTFT and TPOT, and take the bill from the server's usage object, not from your tokenizer.**

### The situation

Suppose your stack records the tokens and the cost of each call, and it times only the whole call. When a call gets slow, that one time cannot say whether your prompt changed or the provider did.

### The picture

Streaming sends tokens as decode makes them, over SSE, a long HTTP response that delivers small chunks. The first chunk with content marks the end of TTFT, and the next chunks arrive about one TPOT apart. The final chunk carries the usage object, the server's count of input and output tokens, which is what you are billed on. It also carries finish_reason, which says why decode stopped.

### Think it through

Your code times the whole call and counts tokens with tiktoken. What can they tell you when a call is slow or the bill looks wrong?

A first thought is that total time and a token count are enough, because the user waits for one and the price sheet multiplies the other.

That thought is reasonable, but it misses one thing. Total time adds your prefill to the provider's queue and decode, and tiktoken only estimates the bill.

So the real question is which timestamps and which counts split one call into its parts.

### The mechanism, step by step

<img src="/videos/inference-internals-phase-1/c6-mechanism.webp" alt="How do you measure TTFT, TPOT and cost: the mechanism, as drawn in the video" width="1280" height="616" loading="lazy" decoding="async" />

1. Send the request with stream set to true, and take a timestamp.
2. Take a second timestamp at the first content chunk, and the difference is TTFT.
3. TPOT is total time minus TTFT, divided by output tokens minus 1, because the first token belongs to TTFT.
4. Ask for usage in the stream options, so the last chunk carries the server's token counts to price the call.
5. Log finish_reason on every call, because length means max_tokens cut the answer off.

### The number

Now the failure. A structured-output call hits max_tokens, so finish_reason is length and the JSON is cut off. The parse fails, and a naive retry pays for the whole prompt again, to fail the same way. So size max_tokens for each call from the schema's worst case, plus the thinking budget on reasoning models. Claude reports this stop as max_tokens, in a field called stop_reason, so a logger that checks only for length misses every Claude truncation.

<img src="/videos/inference-internals-phase-1/c6-number.webp" alt="How do you measure TTFT, TPOT and cost: the number and its source, as shown in the video" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Stream to measure time, and let the server's usage object write the invoice, not your tokenizer.
- **The trap.** Some gateways drop the usage chunk, and code that treats missing usage as zero books every call as free.
- **Try this.** Find where your stack reads usage after a call, and check whether it also stores TTFT and finish_reason.

*You can now split your run log into its causes, and the recap puts the six concepts side by side.*

## Recap

- You are billed for tokens, and the exchange rate depends on what the text looks like.
- TTFT is queue plus prefill, and you pay prefill on the whole prompt, on every request.
- The KV cache is where your prompt lives on the GPU, and its memory sets how many requests fit.
- Output tokens are made one by one, so they cost more in dollars and in seconds.
- Temperature 0 removes the randomness you added, not the randomness of the machine.
- Stream to measure time, and let the server's usage object write the invoice.
- So your 2.1 seconds is queue plus prefill, your 34 tokens per second is decode, and your $0.004 is the server's token count times the price.
- Phase 2 explains the queue, which is why other people's requests change your TTFT.

## Sources

- [Databricks, LLM Inference Performance Engineering: Best Practices](https://databricks.com/blog/llm-inference-performance-engineering-best-practices)
- [Thinking Machines Lab, Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference)
- [Anthropic, A postmortem of three recent issues](https://anthropic.com/engineering/a-postmortem-of-three-recent-issues)
- [Anthropic Messages API reference](https://platform.claude.com/docs/en/api/messages.md)
- [Meta Llama 3.1 8B config (unsloth mirror)](https://huggingface.co/unsloth/Meta-Llama-3.1-8B/raw/main/config.json)
- vLLM, vllm/config/cache.py at tag v0.29.0 (gpu_memory_utilization default 0.92)
- [OpenAI pricing, models and deprecations pages](https://developers.openai.com/api/docs/pricing)
