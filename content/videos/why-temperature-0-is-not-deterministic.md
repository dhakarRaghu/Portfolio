---
title: "Why Temperature 0 Is Not Deterministic"
date: 2026-10-04
summary: "Your CI suite runs your agent at temperature 0 and checks the output text exactly. Ten runs matched, the test shipped, and now it fails at random. Temperature 0 has no random step, so where does the difference come from, and what should the test check?"
tags: [temperature-0, llm-determinism, nondeterminism, greedy-sampling, floating-point, batch-invariance]
playlist: inference-internals
order: 3
part: "#3"
youtube: ""
duration: "4:45"
thumbnail: "/videos/inference-internals-03.webp"
chapters:
  - "0:00 The test that fails at random"
  - "0:35 Where does the randomness come from?"
  - "4:00 Recap"
draft: false
---

Your CI suite, the tests that run on every change, calls your agent at temperature 0 and checks the output text exactly. Ten runs gave ten identical outputs, so the test shipped, and now it fails at random. Temperature 0 has no random step, so why does the same request return different text, and what should the test check?

This video follows one token from the GPU to your failing test, and ends with a test that holds.

## 1. Where does the randomness come from?

**Temperature 0 removes the randomness you added, but it does not remove the randomness of the machine.**

### The situation

Your test sends the same prompt with the same settings, and the provider runs the same model each time. Most runs match, but now and then one run returns an answer that changes partway through.

### The picture

At each decode step the model writes one token, and first it gives every token in its vocabulary a score, called a logit. Softmax turns the logits into probabilities that add up to 1, and temperature divides the logits first. So a low temperature favors the top token, and a high temperature spreads the choice over more tokens. At temperature 0 the sampler always takes the top token, which is called greedy sampling, or argmax.

### Think it through

At temperature 0 the sampler has no random step at all. So why can two identical requests return different text?

A first thought is that GPU threads finish in a random order, because many threads add into one number at once.

That story is common, but a typical model pass has no such shared adds, so the same work gives the same bits.

So the real question is what changes between two runs of your request, if the GPU work itself repeats exactly.

### The mechanism, step by step

<img src="/videos/inference-internals-03/c1-mechanism.webp" alt="The mechanism, as drawn in the video for: Where does the randomness come from?" width="1280" height="616" loading="lazy" decoding="async" />

1. Your request runs in a batch, a group of requests the GPU processes together, and server load changes its size.
2. GPU kernels, the programs that do the math, add numbers in an order that depends on the batch size.
3. Floating-point addition is not associative, so adding in a different order can change the last digits of a sum.
4. The logits move around the 6th decimal place, so when the top two tokens are nearly tied, the top one can change.
5. One changed token early in the answer changes every token after it, because each token feeds the next step.

### The number

Now the measurement. 1,000 completions at temperature 0 from a self-hosted Qwen3-235B gave 80 different outputs. The first difference appeared at token 103, so the answers matched for a while and then split. With batch-invariant kernels, which add in the same order at any batch size, all 1,000 outputs were identical. That costs speed, because 1,000 Qwen3-8B sequences took 26 seconds by default and 42 to 55 seconds with those kernels. Providers say it too, and Anthropic's API reference states that results are not fully deterministic even at temperature 0.

<img src="/videos/inference-internals-03/c1-number.webp" alt="The number and its source, as shown in the video for: Where does the randomness come from?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Temperature 0 removes the randomness you added, not the randomness of the machine.
- **The trap.** Ten identical runs do not make a test stable, so check structure and meaning, never exact bytes.
- **Try this.** Search your tests for checks that compare model output with one exact expected string.

So you rewrite the failing test to check what must stay the same, instead of the exact text. It checks that the output is valid against your schema, that the key facts are present, and that an eval score passes. When you need the same text again, you cache the output you already have, because sampling settings cannot give it back. And if you serve the model yourself, batch-invariant kernels make temperature 0 repeat, at the speed cost you just saw.

## Recap

- Server load changes the batch size, and the batch size changes the order of floating-point additions.
- So the logits move in their last digits, and a near-tie can flip the top token even at temperature 0.
- So your tests check structure and meaning, and you cache an output when you need the same text again.

## Sources

- [Thinking Machines Lab, Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference)
- [Anthropic Messages API reference](https://platform.claude.com/docs/en/api/messages.md)
- [Anthropic, A postmortem of three recent issues](https://www.anthropic.com/engineering/a-postmortem-of-three-recent-issues)
