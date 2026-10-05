---
title: "TTFT, Tokens per Second and Cost: Your LLM Call's 3 Numbers"
date: 2026-10-04
summary: "Your run log shows three numbers for one model call: TTFT (time to first token) 2.1 s, 34 tokens per second, and $0.004. This video gives each number a cause, an owner and a knob."
tags: [ttft, time-to-first-token, tokens-per-second, tpot, llm-latency, llm-cost]
playlist: inference-internals
order: 2
part: "#2"
youtube: ""
duration: "12:04"
thumbnail: "/videos/inference-internals-02.webp"
chapters:
  - "0:00 Your run log's three numbers"
  - "0:38 What does the $0.004 pay for?"
  - "2:58 Where do the 2.1 seconds come from?"
  - "5:11 Why only 34 tokens per second?"
  - "7:53 How do you measure all three?"
  - "10:27 Your three numbers, explained"
  - "11:19 Recap"
draft: false
---

Your run log shows three numbers for one model call: TTFT, the time to first token, of 2.1 s, then 34 tok/s and $0.004. Which one did your code cause, which one belongs to the provider, and which knob moves each? By the end, each number has a cause you can name, an owner, and a knob that moves it.

Four questions follow, one for each number, and one for measuring all three yourself.

## 1. What does the $0.004 pay for?

**The $0.004 pays for tokens, and the exchange rate from text to tokens depends on what the text looks like.**

### The situation

Your cost model estimates the tokens of each call from its text length. You tested it on English, but half of your real support traffic is in Hindi.

### The picture

A tokenizer cuts your text into tokens, the pieces the model reads and the provider bills. It has a fixed vocabulary of pieces, learned from training data that was mostly English and code. So a common English word is often one token, but other text breaks into more, smaller pieces.

### Think it through

Your cost model counts tokens as characters divided by 4. How far off is it when half of the traffic is Hindi?

A first thought is that characters divided by 4 works for any text, because it fits English well.

That is reasonable for English, but the vocabulary is mostly English, so Hindi splits into many more pieces.

So the real question is how many characters one token holds for each kind of text you send.

### The mechanism, step by step

<img src="/videos/inference-internals-02/c1-mechanism.webp" alt="The mechanism, as drawn in the video for: What does the $0.004 pay for?" width="1280" height="616" loading="lazy" decoding="async" />

1. English prose holds about 4 to 4.5 characters per token, because the vocabulary was built for it.
2. Code and JSON drop to about 2 to 3.5, because quotes, braces and indents are tokens too.
3. Hindi holds only about 1 to 2, so the same ticket costs 2 to 4 times the tokens.

### The number

Now the bill. Your agent sends the whole history again on every step of a 10-step loop. So a tool result of 1,000 tokens of pretty-printed JSON is billed ten times, which is 10,000 tokens. As compact JSON the same result is 600 tokens, so it costs 6,000, and the 4,000 difference is only formatting.

<img src="/videos/inference-internals-02/c1-number.webp" alt="The number and its source, as shown in the video for: What does the $0.004 pay for?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** You are billed for tokens, and the exchange rate depends on what the text looks like.
- **The trap.** A tiktoken count on your machine is only an estimate, because each provider uses its own tokenizer.
- **Try this.** Search your agent for json.dumps with indent=2 where the output goes into a prompt.

So you switch your tool results to compact JSON, and the cost of each call goes down. But the same log shows a second number, a TTFT of 2.1 seconds, and it climbs over a long agent session.

## 2. Where do the 2.1 seconds come from?

**Those 2.1 seconds are queue time plus prefill time, and only the prefill part grows with your prompt.**

### The situation

Your log shows a TTFT of 2.1 seconds for one agent step, and later steps take longer.

### The picture

First, your request waits in a queue until the server's scheduler gives it a slot on a GPU. Then prefill sends every prompt token through every model layer in one parallel pass. Prefill ends when the first output token is chosen, and that moment is the end of TTFT.

### Think it through

Your TTFT grows step after step, and the provider's status page stays green. Is that slow start your number or the provider's number?

A first thought is that the provider is slow today, because their load changes during the day.

That is reasonable, but your framework appends history on every step, so each prompt is longer than the last.

So the real question is whether your input tokens grew together with your TTFT.

### The mechanism, step by step

<img src="/videos/inference-internals-02/c2-mechanism.webp" alt="The mechanism, as drawn in the video for: Where do the 2.1 seconds come from?" width="1280" height="616" loading="lazy" decoding="async" />

1. The queue length changes with the provider's load, not with your prompt.
2. Prefill is compute-bound, limited by the GPU's math units, so its time grows with your prompt tokens.
3. From the outside you see only the sum, so you need a second signal to split it.

### The number

Now the failure. Over 25 steps, step latency creeps from 3 seconds to 11, while time per output token stays flat. Plot TTFT per step next to input tokens per step, and when they grow together, the cause is your growing history. When TTFT jumps while your input length stays flat, the cause is the provider's queue.

<img src="/videos/inference-internals-02/c2-number.webp" alt="The number and its source, as shown in the video for: Where do the 2.1 seconds come from?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** TTFT is queue plus prefill, and you pay prefill on the whole prompt, on every request.
- **The trap.** Saying the model is slow today, when the real change was your own prompt growing.
- **Try this.** Compare the input tokens of the first step and the last step of one long agent session.

So you prune the history before each step, and TTFT stops climbing with the step number. But after the first token, the answer still streams at 34 tokens per second, and a teammate wants it faster.

## 3. Why only 34 tokens per second?

**That rate comes from decode, which reads the model from GPU memory for every token, so output is slow and costs more.**

### The situation

Your log shows 34 tokens per second, which is one output token about every 29 milliseconds. A teammate rewrites the prompt to ask for faster answers, and the 34 does not move.

### The picture

During prefill, every layer also computes two vectors per prompt token, K, the key, and V, the value. The server keeps them in GPU memory as the KV cache, because each new token reads the K and V of earlier tokens. After prefill, decode writes the answer one token per step, running the newest token through all layers. Each step reads the whole KV cache, picks the next token, and appends that token's K and V to the cache. The time of one step is called TPOT, the time per output token.

### Think it through

Prefill processes thousands of input tokens per second on this same GPU. So why does decode write only tens of tokens per second?

A first thought is that writing a token is harder math, because choosing a word sounds hard.

That is reasonable, but the math per step is small, and each step reads the weights and the KV cache.

So the real question is what each decode step waits for.

### The mechanism, step by step

<img src="/videos/inference-internals-02/c3-mechanism.webp" alt="The mechanism, as drawn in the video for: Why only 34 tokens per second?" width="1280" height="616" loading="lazy" decoding="async" />

1. Decode reads an 8B model's 16 GB of weights and the KV cache for every token, so the math units wait.
2. So decode is bandwidth-bound, and TPOT depends on memory speed and on how many requests share the GPU.
3. So a prompt rewrite cannot make decode faster, but choosing a smaller model can.
4. Output length is your lever, because total time is TTFT plus output tokens times TPOT.

### The number

The price sheet shows the same physics. gpt-4.1 listed $2.00 per million input tokens and $8.00 per million output tokens. That is 4 times, and across providers the output price runs about 3 to 8 times the input price.

<img src="/videos/inference-internals-02/c3-number.webp" alt="The number and its source, as shown in the video for: Why only 34 tokens per second?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Input tokens are processed in parallel, but output tokens are made one by one, so they cost more.
- **The trap.** Comparing two models by total latency on one prompt, because their answers have different lengths.
- **Try this.** Run one prompt with max_tokens at 40 and then at 400, and check that TTFT stays the same.

Now you know which part makes each number, so you open the log of your next slow call. That call took 21 seconds in total, and your logs cannot say which part of it was slow.

## 4. How do you measure all three?

**To split that call, stream the response to time TTFT and TPOT, and bill from the server's own token count.**

### The situation

Your stack records the cost of each call, with tokens counted by tiktoken, and one timer around the whole call.

### The picture

Streaming sends tokens as decode makes them, over SSE, a long HTTP response that delivers small chunks. The first chunk with content marks the end of TTFT, and the next chunks arrive about one TPOT apart. The final chunk can carry the usage object, the server's count of input and output tokens, which you are billed on.

### Think it through

Your code times the whole call and counts tokens with tiktoken. What do those two numbers tell you when a call is slow?

A first thought is that they are enough, because the user waits for the total and you pay for the count.

That is reasonable, but the total mixes your prefill with their queue and decode, and tiktoken only estimates the bill.

So the real question is which timestamps and which counts split one call into its parts.

### The mechanism, step by step

<img src="/videos/inference-internals-02/c4-mechanism.webp" alt="The mechanism, as drawn in the video for: How do you measure all three?" width="1280" height="616" loading="lazy" decoding="async" />

1. Send the request with stream set to true, and take a timestamp.
2. Take a second timestamp at the first content chunk, and the difference is TTFT.
3. TPOT is total time minus TTFT, divided by output tokens minus 1, because the first token belongs to TTFT.
4. Ask for usage in the stream options, so the last chunk carries the server's token counts.

### The number

Now the slow call. It took 21 seconds in total, with 42,000 input tokens and 380 output tokens. Suppose the stream shows a TPOT of 40 milliseconds, so decode took 380 times 0.04, about 15 seconds. That leaves a TTFT of about 6 seconds, the queue plus the prefill of 42,000 tokens.

<img src="/videos/inference-internals-02/c4-number.webp" alt="The number and its source, as shown in the video for: How do you measure all three?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Stream to measure time, and let the server's usage object write the invoice, not your tokenizer.
- **The trap.** Some gateways drop the usage chunk, and code that reads missing usage as zero books the call as free.
- **Try this.** Find where your stack reads usage after a call, and check whether it also stores TTFT.

So you add the stream timer and the usage read to your stack, and you run the first call again. This time the log splits the call into TTFT, TPOT, and the server's input and output tokens.

## Your three numbers, explained

Your 2.1 seconds is queue plus prefill, so the queue belongs to the provider and the prefill belongs to your prompt. Your knob is the prompt size, and a TTFT jump with a flat prompt means the queue. Your 34 tokens per second is decode, the provider's number, set by memory speed and their load. Your knob there is the model choice, and a shorter output cuts total time, not the rate. Your $0.004 is the server's token count times the price, so the tokens are yours and the price is the provider's. For example, at gpt-4.1's list prices, 1,000 input tokens plus 250 output tokens come to $0.004. So those 250 output tokens cost as much as the 1,000 input tokens.

## Recap

- You are billed for tokens, and the exchange rate depends on what the text looks like.
- TTFT is queue plus prefill, and only prefill grows with your prompt.
- Output tokens are made one by one, so they cost more in dollars and in seconds.
- Stream to measure time, and let the server's usage object write the invoice.

## Sources

- [Databricks, LLM Inference Performance Engineering: Best Practices](https://www.databricks.com/blog/llm-inference-performance-engineering-best-practices)
- [OpenAI API pricing](https://developers.openai.com/api/docs/pricing)
- [Anthropic Messages API reference](https://platform.claude.com/docs/en/api/messages.md)
