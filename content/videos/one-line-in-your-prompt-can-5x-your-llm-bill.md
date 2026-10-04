---
title: "One Line in Your Prompt Can 5x Your LLM Bill"
date: 2026-10-04
summary: "Your support agent's first invoice is $40. You add the current time, to the second, as the first line of the system prompt. The next invoice is over $200, with the same traffic, the same code and the same model. This video follows that one line to the answer."
tags: [llm-cost, prompt-caching, kv-cache, prefix-caching, llm-inference, ai-agents]
playlist: inference-internals
order: 1
part: "#1"
youtube: ""
duration: "7:36"
thumbnail: "/videos/inference-internals-01.webp"
chapters:
  - "0:00 One line, five times the bill"
  - "0:49 What does the GPU remember?"
  - "3:53 What did the timestamp break?"
  - "6:46 Recap"
draft: false
---

You ship a support agent on an LLM API, a large language model you call over the network. Its first invoice is $40, but the model keeps guessing the date wrong. So you add the current time, to the second, as the first line of your system prompt, the instructions sent with every call. The next invoice is over $200, but the traffic, the code and the model are the same. Even the provider's dashboard shows about the same number of tokens, the chunks of text a model reads. So why does one line in your prompt cost five times the bill?

Two questions lead to the answer: what the GPU remembers, and what the timestamp broke.

## 1. What does the GPU remember?

**The GPU keeps the keys and values of past tokens, the KV cache, so a repeated prefix can bill at a tenth.**

### The situation

Your support agent runs on Claude Sonnet, and every step resends the instructions, the tool definitions and the full history. Agent traffic like this averages about 100 input tokens for each output token, so input is most of what you send. Most of each step's input is the same text as in the step before, and only the end is new.

### The picture

When your request reaches the provider, the model reads your whole prompt in one pass, called prefill, on a GPU, the chip that runs it. Then it writes the answer one token at a time, a loop called decode, and each token streams back to you. To write token 52, the model looks back at tokens 1 to 51, a step called attention. Recomputing that history for every new token would repeat work, so the GPU keeps two vectors per past token, called keys and values. That stored history is the KV cache, and it lets each step reuse the past instead of recomputing it. Providers reuse stored work across requests too, and prefix caching keeps the prefill result of a repeated starting chunk, the prefix. A request that starts with the same prefix skips most of that reading, so the provider bills it at about a tenth.

### Think it through

Your prompt has 10,000 tokens, and one word changes at token 5,000 between two calls. How much of the second call is billed at the cached price?

A first thought is almost all of it, because only one word out of thousands changed.

That is reasonable for a cache of separate pieces, but this cache matches one prefix from the start.

So the real question is where the first token that differs sits in your prompt.

### The mechanism, step by step

<img src="/videos/inference-internals-01/c1-mechanism.webp" alt="The mechanism, as drawn in the video for: What does the GPU remember?" width="1280" height="616" loading="lazy" decoding="async" />

1. The provider compares your prompt with the stored prefix from the first byte, and it must match byte for byte.
2. Everything placed before your text counts too, such as hidden system content, tool definitions and schemas.
3. At the first token that differs the match stops, so the cache is invalid from that token onward.
4. So in your example, the tokens before 5,000 bill at the cached price, and everything after bills at full price. So the rule is static content first and variable content last, because the front of the prompt must stay the same.

### The number

On Claude Sonnet, input costs $3 per million tokens, and a cached read costs $0.30, a tenth of the price.

<img src="/videos/inference-internals-01/c1-number.webp" alt="The number and its source, as shown in the video for: What does the GPU remember?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** A cache hit bills the repeated prefix at a tenth, but only up to the first token that differs.
- **The trap.** Thinking a one-word edit costs a little, when everything after the changed token bills at full price.
- **Try this.** Print two consecutive prompts from your agent, and find the first byte where they differ.

Now look at your support agent's prompt, where the very first line is the current time, to the second. So the first token that differs sits at the start of every call, and it changes once a second.

## 2. What did the timestamp break?

**A timestamp at the top changes the prefix on every call, so every call pays full price for all of its input.**

### The situation

In a July 2025 post, the agent company Manus called this a common mistake, from testing across millions of users. The model knows the time, but the cache hit rate, the share of input billed at the cached price, falls to almost zero.

### The picture

Each call now starts with a different time, so the match with the stored prefix stops at the first line. The instructions, tools and history after that line are the same bytes as before, but they bill at full price. Your token counts stay the same, which is why the dashboard showed the same number of tokens.

### Think it through

Your agent sends about 100 input tokens per output token, and Sonnet charges $15 per million output tokens. How many times bigger does the bill get when every call misses the cache?

A first thought is ten times, because the cached price is a tenth of the full input price.

That is reasonable for the input column, but the output column costs the same with or without a cache.

So the real question is what share of the whole bill the cache was removing.

### The mechanism, step by step

<img src="/videos/inference-internals-01/c2-mechanism.webp" alt="The mechanism, as drawn in the video for: What did the timestamp break?" width="1280" height="616" loading="lazy" decoding="async" />

1. Take 100 million input tokens and 1 million output tokens, the 100 to 1 traffic of an agent.
2. With every input token cached, 100 million at $0.30 is $30, plus $15 of output, which gives $45.
3. With the timestamp, 100 million at $3 is $300, plus the same $15 of output, which gives $315.
4. Divide $315 by $45, which gives 7, so a perfect cache that breaks makes the bill seven times bigger. The $15 of output is in both bills, because the cache discounts only input, so output keeps the factor below ten.

### The number

Real agent steps also add new text at the end, so even a working cache does not cover every input token. The chart repeats the arithmetic for each hit rate, the share of input that was cached before the timestamp. At about 93%, the bill grows five times, which is your jump from $40 to over $200. On a model that bills each write into the cache at 1.25 times, the broken prompt also pays that fee on every call.

<img src="/videos/inference-internals-01/c2-number.webp" alt="The number and its source, as shown in the video for: What did the timestamp break?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** A timestamp at the top changes the prefix on every call, so put static content first and variable content last.
- **The trap.** A framework that writes JSON keys in a different order on each run breaks the prefix the same way.
- **Try this.** Move the time below your static instructions and tools, and watch the cached input column of your next invoice.

## Recap

- The KV cache lets a provider bill a repeated prefix at a tenth, but only up to the first changed token.
- A timestamp at the top changes the prefix on every call, so every call pays full price for all of its input.
- Put static content first and variable content last, so the front of every prompt stays the same.

## Sources

- [Manus, Context Engineering for AI Agents (timestamp and JSON-ordering cache failures, 100:1 traffic)](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus)
- [OpenAI docs, prompt caching](https://platform.openai.com/docs/guides/prompt-caching)
