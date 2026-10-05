---
title: "Is Self-Hosting Your LLM Cheaper Than the API?"
date: 2026-10-04
summary: "A rented H100 at $3.49 an hour serves 1,200 output tokens per second at full load. In a meeting, someone divides: $3.49 by 4.32 million tokens an hour is about $0.81 per million tokens, so self-hosting looks twice as cheap as a $1.60 API. A teammate adds a 4-bit checkpoint with about 99% recovery. This video checks both claims."
tags: [self-hosting-llm, llm-cost, cost-per-million-tokens, gpu-utilisation, quantization, 4-bit-quantization]
playlist: inference-internals
order: 12
part: "#12"
youtube: ""
duration: "13:01"
thumbnail: "/videos/inference-internals-12.webp"
chapters:
  - "0:00 The $0.81 in the meeting"
  - "1:07 What does a 4-bit checkpoint make faster?"
  - "4:24 Can you trust the 99% recovery score?"
  - "7:31 So is it cheaper than the API?"
  - "10:46 Back to the meeting"
  - "12:16 Recap"
draft: false
---

Your rented H100 GPU costs $3.49 an hour, and at full load it serves 1,200 output tokens per second. In a meeting, someone divides $3.49 by 4.32 million tokens an hour, which gives about $0.81 per million tokens. The hosted API you use charges $1.60 per million, so self-hosting, serving the model yourself, looks twice as cheap. A teammate adds a 4-bit checkpoint, a copy of the model that stores each weight in 4 bits instead of 16. Its page reports about 99% recovery, its benchmark score as a share of the original's, so the teammate expects a lower cost. So is self-hosting really cheaper than the API, and what would the 4-bit checkpoint actually change?

Three questions follow: what a 4-bit checkpoint makes faster, whether you can trust its 99% score, and what your real cost is.

## 1. What does a 4-bit checkpoint make faster?

**A 4-bit checkpoint helps a quiet server most, and on a busy server 8 bits usually help as much or more.**

### The situation

Your $0.81 came from 1,200 tokens per second at full load, so the checkpoint lowers it only if it raises that number.

### The picture

A request has two phases, and prefill reads your whole prompt in one pass, mostly doing matrix multiplications, the bulk math. Decode writes the answer one token at a time, and each token reads every weight from GPU memory. With one request at a time, decode is memory-bound, which means reading the weights, not the math, sets its speed. With many requests at once, each read of the weights serves the whole batch, so the math becomes the limit.

### Think it through

Your server runs at full load, and the checkpoint stores each weight in a quarter of the bits. Does it cut your cost per token by four?

A first thought is yes, because the GPU now moves a quarter of the bytes for every weight.

That is reasonable when reading sets the speed, but at full load the math sets most of it.

So the real question is which part of a request's time each format makes smaller.

### The mechanism, step by step

<img src="/videos/inference-internals-12/c1-mechanism.webp" alt="The mechanism, as drawn in the video for: What does a 4-bit checkpoint make faster?" width="1280" height="616" loading="lazy" decoding="async" />

1. The 4-bit format, called W4A16, stores the weights in 4 bits, so decode reads about a quarter of the bytes.
2. It turns the weights back into 16 bits before each multiplication, so the math costs what it did before.
3. The 8-bit format, called W8A8, stores the weights and the activations, the numbers passed between layers, in 8 bits.
4. Its multiplications then run in cheaper 8-bit math, so prefill and busy batches get faster too.

### The number

One study measured both formats on Llama 3.1 70B in vLLM, an open-source serving engine. It compared them with BF16, the original 16-bit format of the weights. With one request at a time, a code-completion task took 50.7 seconds in BF16 on two A100 GPUs. The 4-bit checkpoint took 35.0 seconds on one A100, while the 8-bit one took 54.3 seconds on one A100. Under load, with continuous batching, which packs many requests into each step, BF16 on four A100s served 1.4 queries per second. The 8-bit checkpoint served 2.4 and the 4-bit one 2.3, and over seven tasks the study averages 1.87x and 1.64x. So 4 bits win clearly only on the quiet server, and under load the gain in this study stayed below 2x.

<img src="/videos/inference-internals-12/c1-number.webp" alt="The number and its source, as shown in the video for: What does a 4-bit checkpoint make faster?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** 4 bits speed a quiet server most, because decode reads fewer bytes, and 8 bits usually lift a busy one more.
- **The trap.** Reading 4 bits as four times cheaper, when at full load the gain in this study was below 2x.
- **Try this.** Check whether your hours are mostly quiet or mostly at full load, and pick the format for that shape.

But a faster checkpoint is worth nothing until its answers are as good as the original's. The teammate's page answers that with one line: about 99% recovery on standard benchmarks.

## 2. Can you trust the 99% recovery score?

**A recovery score measures only the tasks its benchmark samples, so your gate must use your own traffic.**

### The situation

For 4-bit Llama 3.1 models at three sizes, the study reports 98.7 to 100.0% recovery on one standard benchmark suite. The teammate asks to ship the checkpoint today, because 99% sounds like no loss at all.

### The picture

A benchmark is a sample of tasks, and a standard suite samples mostly short English questions with answer options. Multiple choice absorbs small rounding errors, because the right option only needs to rank first. Damage concentrates in maths, non-Latin scripts and long reasoning, because each token's error feeds the next token. One study of multilingual models measured this gap on a 103-billion-parameter model with 4-bit weights. Its automatic Japanese tasks dropped 1.7%, but human evaluators reported a 16.0% drop on realistic prompts. So the decision belongs to a quantization gate, a pass or fail test on your own items before a checkpoint replaces yours.

### Think it through

Your gate puts the drop in an interval, the range it likely sits in, of 0.2 to 3.4 points. Your limit is 2 points, so do you ship the checkpoint or hold it?

A first thought is ship, because the middle of that interval is 1.8 points, under your limit.

That is reasonable for a single measurement, but the interval says a 3.4-point drop is still possible.

So the real question is which end of the interval must stay inside your limit.

### The mechanism, step by step

<img src="/videos/inference-internals-12/c2-mechanism.webp" alt="The mechanism, as drawn in the video for: Can you trust the 99% recovery score?" width="1280" height="616" loading="lazy" decoding="async" />

1. Draw the items from your own traffic, your task and your languages, because damage hides where suites do not look.
2. Run them at your real maximum context and output length, because errors compound along long answers.
3. Score both checkpoints on the same items, then resample the items many times, which gives a paired interval for the drop.
4. Judge the interval at its worst end, so 3.4 points against a limit of 2 means hold.

### The number

The gate also needs enough items, and with 20 items each item is worth 5 points. One flipped item moves the score 5 points, and its interval reaches a 15-point drop, so the gate holds. The interval rules out zero only when 4 items regress, a 20-point drop, so 20 items cannot see a 2-point drop. So pick the smallest drop you care about first, then add items until the interval can see it.

<img src="/videos/inference-internals-12/c2-number.webp" alt="The number and its source, as shown in the video for: Can you trust the 99% recovery score?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** A benchmark measures only the tasks it samples, so build the gate from your own traffic and context length.
- **The trap.** Judging the interval at its hopeful end ships a checkpoint that the first incident rolls back.
- **Try this.** List your five most common request types, and check which ones a standard suite samples.

Suppose the checkpoint passes your gate, and your next full-load test shows a higher rate. The meeting's $0.81 still hides one more input, and it is not the tokens per second.

## 3. So is it cheaper than the API?

**Your cost per token divides the hourly bill by the tokens you actually serve, so idle hours raise every token's price.**

### The situation

The meeting's math assumed 1,200 tokens in every second of every hour, which is 4.32 million tokens an hour. But your users send fewer requests at night and at weekends, and the rental bills every hour anyway.

### The picture

Cost per million tokens has four inputs, and the hourly rate and the number of GPUs sit on top. Below them sit the sustained tokens per second, the rate your server holds at full load, and utilisation. Utilisation is the share of paid hours that serve real requests, and it is the input people forget.

### Think it through

The H100 bills $3.49 an hour and serves 1,200 tokens per second at full load. Which one input moves your cost per million tokens ten times, without touching the GPU or the model?

A first thought is the hourly price, because a cheaper rental lowers the price of every token.

That moves it, but the price is fixed once you rent, and your busy hours can fall to a tenth.

So the real question is how much of each paid hour serves real requests.

### The mechanism, step by step

<img src="/videos/inference-internals-12/c3-mechanism.webp" alt="The mechanism, as drawn in the video for: So is it cheaper than the API?" width="1280" height="616" loading="lazy" decoding="async" />

1. Start from billed time, because the H100 costs $3.49 an hour whether it writes tokens or waits.
2. Use the sustained rate from your own full-load test, 1,200 tokens per second, which is 4.32 million an hour.
3. Multiply by utilisation, so the cost is about $0.81 per million at 100% and $8.08 at 10%.
4. Divide that full-load cost by the price of one named API, which gives the break-even utilisation.

### The number

The prices in this video are OpenAI's: GPT-4.1 mini at $1.60 and GPT-4.1 at $8.00 per million output tokens. Against GPT-4.1 mini, self-hosting is cheaper only above 50.5% utilisation, and against GPT-4.1 above 10.1%. Then add the people line: a quarter of one engineer, who owns upgrades and incidents, costs $3,750 a month. With the GPU's $2,548 a month, the total is $6,298, so self-hosting must serve 3,936 million tokens to beat GPT-4.1 mini. Against GPT-4.1 it must serve 787 million, and this GPU's ceiling at full load is 3,154 million.

<img src="/videos/inference-internals-12/c3-number.webp" alt="The number and its source, as shown in the video for: So is it cheaper than the API?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Cost per token divides the bill by served tokens, so state a utilisation and name the API first.
- **The trap.** Comparing the full-load cost with the API price, when at 10% utilisation the real cost is ten times higher.
- **Try this.** Divide your full-load cost by each API's price, and bring both break-even utilisations to the meeting.

## Back to the meeting



## Recap

- 4 bits speed a quiet server most, because decode reads fewer bytes, and 8 bits usually lift a busy one more.
- A benchmark measures only the tasks it samples, so gate a checkpoint on your own traffic, at the interval's worst end.
- Cost per token divides the bill by served tokens, so state a utilisation, name the API and add the people line.

## Sources

- [Give Me BF16 or Give Me Death? Accuracy-Performance Trade-Offs in LLM Quantization (Tables 2, 5, 6)](https://arxiv.org/abs/2411.02355)
- [How Does Quantization Affect Multilingual LLMs? (Marchisio et al.)](https://arxiv.org/abs/2407.03211)
- [OpenAI API pricing (GPT-4.1, GPT-4.1 mini)](https://developers.openai.com/api/docs/pricing)
- [vLLM: The State of FP8 KV-Cache (written lesson only)](https://vllm.ai/blog/2026-04-22-fp8-kvcache)
- [Fast Inference from Transformers via Speculative Decoding (written lesson only)](https://arxiv.org/abs/2211.17192)
