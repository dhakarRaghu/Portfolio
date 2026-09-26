---
title: "Sample essay: what a post looks like on this site"
date: 2026-09-27
summary: "A draft that exists only to check the typography. It never renders in production. Delete it when the first real essay lands."
tags: [meta, design]
category: career
section: blog
draft: true
---

This file is a draft. Drafts render in development so the layout can be checked. In production they are skipped, and the RSS feed and sitemap skip them too.

## Headings, links and emphasis

An essay opens with one paragraph that says what the reader will be able to decide after reading. Then the sections follow. A section heading is a question or a claim, never a topic word. Links look like [this one to the home page](/), and **bold** is used for the one term the section introduces.

Inline code such as `max-num-batched-tokens` sits inside the sentence. A longer term gets its own line.

## A table with numbers

| Workload | Knee, token-aware | Knee, round-robin | Throughput at the knee |
|---|---|---|---|
| code generation | 60 | 30 | 46K against 16K in-tok/s |
| reasoning | 350 | 250 | 7.0K against 6.8K out-tok/s |
| b2b saas | 38 QPS | 18 QPS | 90K against 45K in-tok/s |

The row a reader needs is the one where the two numbers are close. That is where the technique stops paying.

## A code block

```python
def with_retries(p: float, retries: int, recall: float) -> float:
    """Success after up to `retries` extra attempts when a check
    catches a failure with probability `recall`."""
    q = (1 - p) * recall
    if q == 1.0:
        return 0.0
    return p * (1 - q ** (retries + 1)) / (1 - q)


print(with_retries(0.9, 1, 0.8))   # 0.9 -> 0.972
```

### A sub-section

Sub-sections carry the detail a first-time reader can skip. The table of contents on a wide screen lists them under their parent.

> A quote is set off like this. It is for another person's words, with the source linked in the sentence before it.

## What to remember

One sentence. Then stop.
