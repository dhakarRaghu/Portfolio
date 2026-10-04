---
title: "The Cache Bug No Dashboard Caught for 4 Months"
date: 2026-10-04
summary: "A release adds a request ID, for tracing, to the first line of your agent's 18,000-token cached system prompt. Every response still returns 200 with the same token count, every dashboard stays green, and for four months every request pays full price for the prompt. This video catches it within two requests and puts a hard ceiling on the spend."
tags: [prompt-caching, llm-cost, cost-alerting, cache-hit-rate, llm-observability, budget-guard]
playlist: inference-internals
order: 10
part: "#10"
youtube: ""
duration: "9:17"
thumbnail: "/videos/inference-internals-10.webp"
chapters:
  - "0:00 Four months behind green dashboards"
  - "0:42 Which rules catch a broken cache?"
  - "4:51 What can stop the spend?"
  - "8:29 Recap"
draft: false
---

The provider caches your agent's 18,000-token system prompt, so most of it bills at a cheaper cached price. Then a release adds a request ID to the first line of the prompt, so that each request can be traced. Every response still returns 200 with the same token count, so every dashboard stays green. But for the next four months, every request pays full price for the 18,000 prompt tokens. So how would you catch this in ten requests, and what would stop the spend?

Two questions follow: which rules catch a broken cache, and what can stop the spend.

## 1. Which rules catch a broken cache?

**You catch it with numbers that are not token counts, because a broken cache changes the price and not the tokens.**

### The situation

In a replay of the incident, your agent runs 200 requests, and the release with the request ID lands at request 50. The ID is new on every call, so the prompt no longer starts with the prefix that the provider cached. The status stays 200 and the token count stays flat, so none of your token charts moves at the break.

### The picture

A per-request ledger keeps one row for each call, with every token class, its priced cost and the cache hit rate. A token class is a kind of token with its own price, such as plain input, cached input or output. The cache hit rate is the share of input tokens billed at the cached read price. A per-request budget checks one call against a ceiling, and a rolling cost rule checks the recent average cost against a baseline. A cache hit floor checks the recent hit rate against a threshold, so the three rules see what the token count hides.

### Think it through

The release lands at request 50, and the token count per request does not change. Which of the three rules fires first?

A first thought is the per-request budget, because every request now costs much more than before.

That is reasonable for one extreme call, but every request rose by the same factor, so none of them is an outlier.

So the real question is which number moves on every request when only the billing class changes.

### The mechanism, step by step

<img src="/videos/inference-internals-10/c1-mechanism.webp" alt="The mechanism, as drawn in the video for: Which rules catch a broken cache?" width="1280" height="616" loading="lazy" decoding="async" />

1. The same bytes cross the wire, so the token count stays flat through the break at request 50.
2. 18,000 cached tokens become 18,000 full-price tokens, so the cost per request goes from $0.0074 to $0.0398, which is 5.4 times.
3. The cache hit rate drops from its normal near 98% to 0% on the first request after the change.
4. Both window rules average the last 20 requests, and the rolling cost rule fires at request 52 and says cost moved. The cache floor, set at a tidy 0.50, fires at request 59 and says why, seven requests after the cost rule.
5. Keep a cached price in your price sheet, or the meter bills cached tokens at full price and no cost rule fires.

### The number

The floor fired seven requests after the cost rule, and the reason is the distance the average has to travel. The rolling average starts at 0.98, and each zero-hit request pulls it down by about 0.98 divided by the window of 20. With a floor of 0.50 the gap is 0.48, so the average needs about 10 zero-hit requests to cross it, and the rule fires at 59. Raise the floor to 0.90, just below the measured normal, and the gap is only 0.08, so the rule fires at request 51. A 5-request window also shortens the wait, and with both changes both rules fire at request 50, the first broken one. But a small window gives false alarms, because one zero-hit request in a window of five pulls 0.98 down to about 0.78. Store the measured normal outside the process, because a baseline taken at startup after a prompt change measures the broken system.

<img src="/videos/inference-internals-10/c1-number.webp" alt="The number and its source, as shown in the video for: Which rules catch a broken cache?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** A broken cache moves only the billing class, so detect it with per-request cost and cache hit rate.
- **The trap.** A tidy 0.50 floor on a 98% workload fires nine requests late, after the cost rule it was meant to beat.
- **Try this.** Measure your cache hit rate for a week, then compute the delay for floors 0.50 and 0.90 at your window.

With the 0.90 floor, the cache rule fires at request 51 and the cost rule at 52, two requests after the break. But both rules only send an alert to a person, and your agent keeps sending requests while that person reads it. The same agent runs a retry loop that can call the model up to 50 times in one session.

## 2. What can stop the spend?

**An alert cannot stop that loop, because only a check made before the call can refuse it.**

### The situation

Your team has set a hard spend limit with the provider, so the team thinks the loop is safe. The provider limit and your two alert rules all react to spend, so what matters is when each of them learns about it.

### The picture

On one request's timeline, the rolling cost rule reads spend after the response, the provider cap after it records spend, and the invoice weeks later. Each of them measures spend well, but by the time any of them reacts, the tokens are already billed. A pre-call reservation sits before the call, so it is the only point on the timeline that can refuse a request.

### Think it through

Your provider hard limit is set, and the retry loop keeps calling the model. Does the provider limit stop the loop?

A first thought is yes, because the provider counts every token and blocks spending at the limit.

That is reasonable for the month, but the limit is monthly, covers a whole org or project, and its enforcement is not instantaneous.

So the real question is what can price a call before it is sent, and refuse it.

### The mechanism, step by step

<img src="/videos/inference-internals-10/c2-mechanism.webp" alt="The mechanism, as drawn in the video for: What can stop the spend?" width="1280" height="616" loading="lazy" decoding="async" />

1. Read max_tokens, the field that bounds how long the reply may be, because the output size is the only unknown.
2. Price the worst case, which is every input token plus max_tokens of output, at full price from your price sheet.
3. Hold that amount against the budget, and if it does not fit, reject the call so the provider is never contacted.
4. After the response, release the reservation and charge the real cost, which is almost always lower.
5. Hold the reservation for the whole loop, because a per-request check has no memory of the 49 calls before it.

### The number

Take the replay model's prices from the course price sheet, $2 per million input tokens and $12 per million output tokens. One call carries the 18,000-token prompt plus 400 more input tokens, 18,400 in all, with a max_tokens of 2,000. It reserves $0.0368 for input plus $0.0240 for output, which is $0.0608. Fifty iterations reserve 50 × $0.0608, which is $3.04, and that number exists before the first call runs. LiteLLM's proxy reserves the estimated maximum cost by default, and its fail-closed mode rejects with a 503 when it cannot verify spend. Without any such ceiling, a stolen API key at METR spent about $600,000 of credits over about three weeks.

<img src="/videos/inference-internals-10/c2-number.webp" alt="The number and its source, as shown in the video for: What can stop the spend?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Only a pre-call reservation priced at the max_tokens worst case, held for the whole loop, stops spend before it happens.
- **The trap.** A provider hard cap looks like a guard, but its monthly interval and slow enforcement let a loop overspend inside the limit.
- **Try this.** Compute N times the per-call worst case for your longest loop, and write that number next to the loop.

Now replay the release with both pieces in place, the 0.90 cache floor and the session reservation. The cache rule fires at request 51 and the cost rule at 52, so a person learns that the cache broke and where to look. The reservation prices every input token at full price, so the broken-cache call at $0.0398 still fits inside its $0.0608. So the four months become two requests before an alert, and no session can spend more than the $3.04 it reserved.

## Recap

- A broken cache moves only the billing class, so watch per-request cost and cache hit rate, not tokens.
- Set the cache floor just below the measured normal, because every point of gap adds requests of delay.
- Only a pre-call reservation from max_tokens, held for the whole loop, stops the spend before it happens.

## Sources

- [OpenAI spend limits](https://developers.openai.com/api/docs/guides/spend-limits)
- [LiteLLM budgets and reservation](https://docs.litellm.ai/docs/proxy/users)
- [METR, Update on Security at METR](https://metr.org/blog/2026-08-31-security-update)
