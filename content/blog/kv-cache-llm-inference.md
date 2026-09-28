---
title: "Why the KV Cache, Not Compute, Limits LLM Serving"
date: 2026-09-28
summary: "One formula from a model's config file tells you how much GPU memory each token costs, and that number explains batch limits, queues and output-token prices."
tags: [kv-cache, llm-inference, gpu-memory, prompt-caching, gqa]
category: inference
section: blog
draft: true
---
When a server runs a large language model for you, the scarce resource is not the GPU's math units. It is the GPU's memory. One stored object, the KV cache, uses that memory, and its size decides how many requests one card can serve at once. That count decides why you wait in a queue at peak time and why output tokens cost more than input tokens on every price sheet.

This essay explains what the KV cache is, derives the formula for its size, and works through one full capacity calculation you can check by hand. One example runs through every section: Llama-3-8B, an open 8-billion-parameter model, on one 80 GB H100 GPU. Every constant comes from the model's public config file, so the arithmetic in section five can be checked against section two.

## Decode needs the whole past at every step

A language model is a stack of transformer layers, and it generates text one token at a time. Each new token is chosen using the attention state of every token before it. The attention state of a token is two vectors per layer, called K and V. When your prompt arrives, the server runs one parallel pass over the whole prompt, and every layer computes K and V for every prompt token. That pass is called <dfn>prefill</dfn>.

After prefill, generation starts. This phase is called <dfn>decode</dfn>, and it produces one token per step. Step 500 needs the K and V of tokens 1 to 499. The naive approach stores nothing, so step 500 recomputes those vectors for all 499 earlier tokens. The cost of that choice grows fast. Step t redoes work proportional to t, so a 1,000-token answer redoes work proportional to 1 + 2 + 3 + ... + 1,000. That sum is 1,000 x 1,001 / 2 = 500,500 token computations, instead of the 1,000 you would do if the past were stored. The answer is 500 times more compute for the same text.

The fix is to store every K and V after computing it once. That store is the <dfn>KV cache</dfn>. With it, each decode step reads the cache instead of recomputing the past. Reading memory is far cheaper than running the model's layers again, but the cache itself must live in GPU memory. The rest of this essay shows that this memory, and not compute, is what limits a serving system.

## One formula gives the memory per token

The KV cache grows by a fixed number of bytes for every token, prompt token or answer token. The formula is:

KV bytes per token = 2 x layers x kv_heads x head_dim x bytes_per_value

The 2 is there because each token stores two vectors, K and V. layers is the number of transformer layers in the model. kv_heads is the number of key-value heads, the count of independent K and V vector sets each layer keeps. head_dim is the length of each head's vector. bytes_per_value is 2 for models whose numbers are stored in <dfn>bfloat16</dfn>, a 16-bit floating-point format in which every value takes 2 bytes.

All four numbers come from the model's public config file. The config for Llama-3.1-8B at huggingface.co/unsloth/Meta-Llama-3.1-8B/raw/main/config.json lists 32 layers, 8 key-value heads, a head dimension of 128, and bfloat16 weights. Filling in:

2 x 32 x 8 x 128 x 2 bytes = 131,072 bytes = 128 KB per token.

Two consequences follow from that one number. An 8,000-token context costs about 1 GB of GPU memory for one request. A 128,000-token context costs about 16 GB. The second number is the size of the model's own weights, so one long request needs as much memory for its cache as the whole model needs to exist on the card.

The formula is short enough to keep as code:

```python
def kv_bytes_per_token(layers, kv_heads, head_dim, dtype_bytes=2):
    return 2 * layers * kv_heads * head_dim * dtype_bytes   # 2 = K and V

def max_concurrent(gpu_gb, util, weights_gb, ctx_tokens, per_tok):
    free = (gpu_gb * util - weights_gb) * 1024**3           # reserve headroom
    return int(free // (per_tok * ctx_tokens))

assert kv_bytes_per_token(32, 8, 128) == 131_072            # llama-3-8b: 128 KB
```

The util argument is the fraction of the card's memory the server is allowed to use. The next section gives it a real value.

## A worked capacity number on one H100

Take the running example: one 80 GB H100 serving Llama-3-8B, whose weights need about 16 GB. Servers never give the full card to caches. They reserve memory for the temporary values each layer computes while it runs. The open source serving engine vLLM exposes this as the setting gpu_memory_utilization, the fraction of total GPU memory the server may use for weights and caches together. In vLLM v0.29.0, the source file vllm/config/cache.py sets the default to 0.92. With util = 0.92, the memory left for caches is:

80 GB x 0.92 - 16 GB = 57.6 GB available for KV caches.

At 1 GB per request with an 8,000-token context, 57.6 GB fits about 57 concurrent requests. That is the card's capacity for this model at this context length. Request number 58 waits for memory to free up, not for compute to free up. That waiting line is the queue you see as a slower first token at peak time.

Batch APIs follow from the same arithmetic. A batch API is an endpoint where you submit many requests at once and accept results hours later instead of streamed now. At off-peak times, some of the 57 slots hold no request, so the provider can fill them with batch work and charge less for it, because the memory would otherwise sit unused.

Notice what did not appear anywhere in this calculation: the speed of the GPU's math units. Compute did not limit how many streams the card serves. Memory did.

## GQA exists to shrink this cache

The config lists 8 key-value heads but 32 attention heads. This is grouped-query attention, <dfn>GQA</dfn>: each of the 8 key-value heads is shared by 4 of the 32 attention heads, instead of every attention head keeping its own K and V. The cache is 4 times smaller than the unshared design.

Consider what that design choice means. Llama's designers changed the attention mechanism, the core computation of the model, in order to make this one stored object smaller. A more aggressive variant, multi-query attention, shares a single key-value head across all 32 attention heads, which shrinks the cache 32 times. When a field keeps redesigning its architectures around the same stored object, that object is the one whose size matters most.

The formula turns these choices into numbers. If a model of the same size used 2 key-value heads instead of 8, each token would cost 32 KB instead of 128 KB, and the same 57.6 GB budget would fit roughly 230 requests at 8k context, four times as many. Halve the context length instead and the fit count doubles. Capacity is arithmetic you can do before you run any benchmark.

## Why output tokens cost more

The KV cache also explains the price sheet. Prefill is one parallel pass over the whole prompt. The GPU's math units are fully used, and thousands of prompt tokens are processed per second. Decode works differently. Each step computes little, but it must first read the model's weights and the entire cache from memory, because the new token attends over everything before it. Each step waits on memory reads instead of math, so decode is <dfn>memory-bandwidth-bound</dfn>, and output tokens come out at tens per second per stream instead of thousands.

Databricks measures how inefficient a single decode stream is in their inference best-practices post at databricks.com/blog/llm-inference-performance-engineering-best-practices. They define <dfn>model bandwidth utilization</dfn>, the share of the card's memory bandwidth a stream actually uses, and measure about 55 to 60 percent at batch size 1. A single stream reads all the weights for each token and still leaves the math units mostly idle. So providers batch many customers' requests on one card: one read of the weights then serves every stream in the batch. That is also why your per-token streaming speed moves with their load rather than with anything in your request.

So the same model produces the two token classes at very different speeds, and the price sheet reflects that. OpenAI's list prices for gpt-4.1, for example, were $2.00 per million input tokens and $8.00 per million output tokens as of 2026-09-01, a 4x ratio. That model has since left the public pricing page, but the direction of the gap is the physics above: input tokens come from a parallel pass that keeps the math units busy, and output tokens come from a serial loop that waits on memory.

Because decode speed is a property of the model and the hardware, no prompt can make a model generate tokens faster. To change per-token speed, change the model.

## Where this stops working

There are three limits to the arithmetic above.

First, the formula assumes a dense transformer model with attention over the full context, where dense means every parameter participates in every token. Two common designs change the constants. In a quantized model, the weights and sometimes the cache are stored in a smaller numeric format than 16 bits, for example 8-bit or 4-bit integers, so bytes_per_value drops and the cache shrinks. In sliding-window attention, each token attends only over the most recent few thousand tokens instead of the full history, so the cache stops growing with total context length. Check the config file before you trust the arithmetic.

Second, a hosted API hides the mechanism. The provider does not tell you how many other customers share your card or what the memory budget is. From the outside you can measure only the time to the first token and the per-token streaming speed. The internal capacity numbers in this essay need a GPU you run yourself, or at least a serving engine whose config you can read.

Third, the versioned facts age. The 0.92 default was read in vLLM v0.29.0, and the gpt-4.1 prices on a 2026-09-01 list that no longer appears on the public page. When these change, the formula stays and only the constants move.

## GPU memory, not compute, is what limits serving

The KV cache stores your prompt's attention state in GPU memory for the lifetime of your request, at a fixed cost of 2 x layers x kv_heads x head_dim x bytes_per_value per token. Its size sets how many requests one card can serve, and that count sets the queue you wait in. Compute the per-token bytes for the model you use, read its config file instead of trusting anyone's table, and the structure of any inference invoice becomes arithmetic you can check yourself.
