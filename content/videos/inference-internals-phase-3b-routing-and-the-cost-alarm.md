---
title: "Router or coin flip? LLM routing and the cost alarm"
date: 2026-10-03
summary: "Two cascades show 85% accuracy at 69% of the strong model's cost, and one of them escalates at random. A timestamp at the top of a system prompt broke the prompt cache for four months with no error."
tags: [llm-routing, model-cascade, llm-cost, prompt-caching, cost-alerting]
playlist: inference-internals
order: 32
part: "Phase 3B"
youtube: ""
duration: "18:00"
thumbnail: "/videos/inference-internals-phase-3b.png"
chapters:
  - "0:00 Router or coin flip?"
  - "0:34 Five questions"
  - "0:56 Why does a cascade pay for some queries twice?"
  - "3:54 Which experiment proves the signal works?"
  - "7:10 Which escalation signal deserves your extra calls?"
  - "10:20 Which rules catch what the token chart cannot?"
  - "13:51 What can actually stop the spend?"
  - "17:12 Recap: Phase 3B"
draft: false
---

Two cascades run on your traffic, and both dashboards show 85% accuracy at 69% of the strong model's cost. Your first thought is to ship either one, but one signal was tuned for a week and the other is a coin flip. Nothing on those two dashboards can tell them apart, so this video builds the checks that can.

This video teaches five concepts, and each one answers a question about your team's cascade and its bill. The first three decide how to spend less on each query, and whether the routing signal knows anything. The last two catch a cost jump that the token chart cannot show, and then stop the spend before it happens.

## 1. Why does a cascade pay for some queries twice?

**A cascade pays the cheap model for every query, so escalated queries cost more than going straight to the deep model.**

### The situation

Your team sends every query to the strong model, because routing easy ones to a cheap model sounds risky. The proposal on the table is a cascade, and its first test shows 88% accuracy at 55% of the cost.

### The picture

There are two ways to split traffic between a cheap model and a deep model. A cascade sends every query to the cheap model, reads its answer, and sends the unsure ones on to the deep model. A router reads the query first and sends it to one model, so only that model runs. In both shapes, the share of queries that reach the deep model is called the escalation rate, e. The cascade still has a reason to exist, because its signal reads a finished answer while the router decides from the prompt alone.

### Think it through

Here is the question. Your cheap model costs $1 per million tokens and your deep model costs $5. At what escalation rate does the cascade stop saving money? Let's think it through.

- **First thought.** A first thought is that the cascade always saves, because the cheap model is five times cheaper.
- **What it misses.** That thought is reasonable, but it misses that a query which gets escalated runs both models, not one.
- **The real question.** So the real question is how many queries can pay twice before the total passes $5.

### The mechanism, step by step

![Why does a cascade pay for some queries twice: the mechanism, as drawn in the video](/videos/inference-internals-phase-3b/c1-mechanism.webp)

1. Every query enters through the cheap model, so every query pays 1, with no e in front of it.
2. Escalation adds a second answer on top of the first, so an escalated query pays 1 plus 5, which is 6.
3. The cascade loses when 1 + 5e is more than 5, so the break-even is e = 0.8, or 80%.
4. In general, the cascade saves money only while e stays below 1 minus the price ratio.

### The number

Now your team's case, at 35% escalation. The cascade costs 1 + 0.35 × 5, which is 2.75, or 55% of deep-only. The router pays once per query, so on the same traffic it costs 48%. The 7-point gap is the cheap answer the cascade paid for and did not use. Across five benchmarks and eight models, a light router beat the best cascade on four datasets, and the paper names this double payment as the cause.

![Why does a cascade pay for some queries twice: the number and its source, as shown in the video](/videos/inference-internals-phase-3b/c1-number.webp)

### Key points

- **Remember.** a cascade costs Cc + e·Cd per query, so it saves only while e stays under 1 − Cc/Cd.
- **The trap.** an escalated query does not cost the deep price alone, because it pays both models.
- **Try this.** take your two models' prices, compute 1 minus their ratio, and compare it with your escalation rate.

*This concept priced the cascade, but a price says nothing about whether its signal knows anything. Concept 2 asks which experiment proves the signal works.*

## 2. Which experiment proves the signal works?

**A coin-flip signal can look exactly like a real one, so only an equal-count random control proves your signal knows something.**

### The situation

Picture two teams with a cascade on the same traffic, and team A's signal was tuned for a week. Team B's signal is a random number, but both dashboards show 85% accuracy at 69% of deep-only cost.

### The picture

The fix is one more row in your results table, and that row is called a random control. A random control is a second cascade that escalates the same number of queries as yours, on the same traffic. The only difference is that it picks those queries at random, so it shows what chance alone would buy.

### Think it through

Here is the question. Team B escalates at random, and its dashboard still shows 85% accuracy. Why does a coin flip look as good as a tuned signal? Let's think it through.

- **First thought.** A first thought is that a random signal must show worse accuracy, because it escalates the wrong queries.
- **What it misses.** That sounds reasonable, but any escalation swaps some cheap answers for deep answers, so it buys accuracy even by luck.
- **The real question.** So the real question is whether your signal picks better queries than chance picks, at the same cost.

### The mechanism, step by step

![Which experiment proves the signal works: the mechanism, as drawn in the video](/videos/inference-internals-phase-3b/c2-mechanism.webp)

1. Run your real cascade, and record its accuracy and its cost per query.
2. Run the control with the same escalation rate and random picks, because the cost must match for the comparison to mean anything.
3. Rank both on dollars per correct answer, which is the total spend divided by the count of correct answers.
4. Accuracy alone hides the waste of cheap-only, and cost alone hides the waste of deep-only, so this one number counts both.
5. Subtract the control from your signal and keep the standard error, because a gap under two standard errors can appear by chance.

### The number

In the course simulation, a cascade whose signal was no better than a coin flip still showed 85% accuracy at 69.3% of deep-only cost. Against the equal-count random control its gap was 0.4 points, which sits inside two standard errors, so the control convicted it. One small trial can also mislead you, because with about 20 items per arm one accuracy number moves by roughly 7 points. The same coin-flip signal over three seeds printed gaps of +10, 0 and −5 points, so seed one would ship the coin flip. A benchmark that re-ran 10 routing baselines found several, including commercial routers, that fail to reliably beat a simple baseline.

![Which experiment proves the signal works: the number and its source, as shown in the video](/videos/inference-internals-phase-3b/c2-number.webp)

### Key points

- **Remember.** a real signal must beat a random control that escalates the same count, ranked on dollars per correct answer.
- **The trap.** 88% accuracy at 55% of deep-only cost can describe a coin-flip cascade, so you would ship noise at deep-model prices.
- **Try this.** run the coin-flip comparison once with each of three seeds, and see how far one 20-item trial's gap moves.

*This concept tests whether a signal carries information, but it does not say which signal is worth testing. Concept 3 asks which escalation signal deserves your extra calls.*

## 3. Which escalation signal deserves your extra calls?

**On strong models, samples of one model repeat that model's own mistakes, so spend extra calls on different models.**

### The situation

Your cascade needs a signal that says when the cheap model's answer is doubtful, and the cheapest one to build is to ask again. If five samples all say Paris, the answer feels safe, so your team plans to accept it without the deep model.

### The picture

Self-consistency is the signal of sampling one model several times and accepting the answer that most samples agree on. A cross-model jury sends the same query to two or three different models and checks whether they agree. The third choice is to ask the model how confident it is, in words or as a percentage.

### Think it through

Here is the question. Your audit samples one frontier model 50 times on each question, and on 77% of questions the samples strongly agree. What share of those agreeing answers do you expect to be wrong? Let's think it through.

- **First thought.** A first thought is very few, because 40 of 50 samples on one answer looks like strong evidence.
- **What it misses.** That is reasonable for independent measurements, but these samples all come from the same weights, so they share the same mistakes.
- **The real question.** So the real question is whether agreement measures the truth of the answer or the bias of the model.

### The mechanism, step by step

![Which escalation signal deserves your extra calls: the mechanism, as drawn in the video](/videos/inference-internals-phase-3b/c3-mechanism.webp)

1. A model that learned a wrong rule gives the same wrong answer on every sample, so its samples cluster on that answer.
2. A model that prefers an option because of its position picks it every time, so agreement grows without accuracy.
3. Different models are trained differently, so their mistakes land in different places and only the correct answer collects agreement.
4. Stated confidence is scored with the Brier score, the mean squared gap between confidence and correctness, where 0 is perfect.

### The number

On 265,000 samples, the most consistent frontier model agreed strongly on 77% of questions, and 48% of those answers were wrong. So a cascade that accepts every agreeing answer lets about 37 of every 100 questions through unescalated and wrong. Stated confidence is weak too, because the best of 15 frontier models scored a Brier of 0.103, against 0.1875 for a calibrated random guesser. One shipped model scored 0.367, about twice as bad as guessing, and the most accurate model was not the best calibrated one.

![Which escalation signal deserves your extra calls: the number and its source, as shown in the video](/videos/inference-internals-phase-3b/c3-number.webp)

### Key points

- **Remember.** agreement among samples of one model measures that model's bias, so spend confidence calls on different models.
- **The trap.** accepting an answer because five samples agree accepts answers that are wrong 48% of the time on the most consistent frontier model.
- **Try this.** ask your frontier model for its confidence on ten questions you know the answers to, and compare it with what was right.

*The routing concepts now spend less on each query, but nothing yet notices when the bill moves for another reason. Concept 4 asks which rules catch what the token chart cannot.*

## 4. Which rules catch what the token chart cannot?

**A broken cache changes the price but not the token count, so you watch cost and cache hit rate on every request.**

### The situation

Your agent's system prompt is 18,000 tokens long, and the provider caches it, so most of it bills at the cheaper cached price. One day someone adds a timestamp to the top of it, and the response still returns 200 with the same token count. Every dashboard you own stays green, and for four months every request pays full price for the prompt.

### The picture

A per-request ledger keeps one row for each call, with every token class, its priced cost and the cache hit rate. The cache hit rate is the share of input tokens billed at the cached read price. A per-request budget checks one call against a ceiling, and a rolling cost rule checks the recent average cost against a baseline. A cache hit floor checks the recent hit rate against a threshold, so the three rules see what the token count hides.

### Think it through

Here is the question. Tonight the timestamp goes in, and the token count per request does not change. Which of the three rules fires first? Let's think it through.

- **First thought.** A first thought is the per-request budget, because every request now costs much more than before.
- **What it misses.** That is reasonable for one extreme call, but every request rose by the same factor, so none of them is an outlier.
- **The real question.** So the real question is which number moves on every request when only the billing class changes.

### The mechanism, step by step

![Which rules catch what the token chart cannot: the mechanism, as drawn in the video](/videos/inference-internals-phase-3b/c4-mechanism.webp)

1. The same bytes cross the wire, so the token count stays flat through the break at request 50.
2. 18,000 cached tokens become 18,000 full-price tokens, so the cost per request goes from $0.0074 to $0.0398, which is 5.4 times.
3. The cache hit rate drops from its normal near 98% to 0% on the first request after the change.
4. The rolling cost rule fires at request 52 and says cost moved, and the cache floor fires at 59 and says why.
5. Keep a cached price in your price sheet, or the meter bills cached tokens at full price and no cost rule fires.

### The number

The cache floor fired seven requests after the cost rule, and one line of arithmetic explains why. The rolling average starts at 0.98, and each zero-hit request pulls it down by about 0.98 divided by the window of 20. With a floor of 0.50 the gap is 0.48, so the walk takes about 10 requests and the rule fires at 59. Raise the floor to 0.90, just below the measured normal, and the gap is only 0.08, so the rule fires at request 51. A smaller window also shortens the walk, but it gives false alarms on noisy traffic, so you trade alarms against delay. Store the measured normal outside the process, because a baseline taken at startup after a prompt change measures the broken system.

![Which rules catch what the token chart cannot: the number and its source, as shown in the video](/videos/inference-internals-phase-3b/c4-number.webp)

### Key points

- **Remember.** a broken cache moves only the billing class, so detect it with per-request cost and cache hit rate.
- **The trap.** a tidy 50% floor on a 98% workload fires nine requests late, after the cost rule it was meant to beat.
- **Try this.** add cost and cache hit rate to one request log line, and check that both appear on one normal call.

*Both rules now tell a person that cost moved, but neither of them stops a single request. Concept 5 asks what can actually stop the spend.*

## 5. What can actually stop the spend?

**Every control that reads the bill reacts after the tokens exist, so only a reservation made before the call can stop spend.**

### The situation

Your evening project is a multi-agent system, and one of its retry loops can call a model up to 50 times in a session. Your team has set a hard spend limit with the provider, so the loop looks safe.

### The picture

On one request's timeline, the rolling cost rule reads spend after the response, the provider cap after it records spend, and the invoice weeks later. Each of them measures spend well, but by the time any of them reacts, the tokens are already billed. A pre-call reservation sits before the call, so it is the only point on the timeline that can refuse a request.

### Think it through

Here is the question. Your provider hard limit is set, and the retry loop starts to run away. Does the provider limit stop the loop? Let's think it through.

- **First thought.** A first thought is yes, because the provider counts every token and blocks spending at the limit.
- **What it misses.** That is reasonable for the month, but the limit is monthly, covers a whole org or project, and its enforcement is not instantaneous.
- **The real question.** So the real question is what can price a call before it is sent, and refuse it.

### The mechanism, step by step

![What can actually stop the spend: the mechanism, as drawn in the video](/videos/inference-internals-phase-3b/c5-mechanism.webp)

1. Read max_tokens, the field that bounds how long the reply may be, because the output size is the only unknown.
2. Price the worst case, which is every input token plus max_tokens of output, at full price from your price sheet.
3. Hold that amount against the budget, and if it does not fit, reject the call so the provider is never contacted.
4. After the response, release the reservation and charge the real cost, which is almost always lower.
5. Hold the reservation for the whole loop, because a per-request check has no memory of the 49 calls before it.
6. A batch submit cannot be reserved at all, because its body carries only a reference to a file, not the prompts or max_tokens.

### The number

Take illustrative prices of $3 per million input tokens and $15 per million output tokens. One call with 18,000 input tokens and a max_tokens of 2,000 reserves $0.054 plus $0.030, which is $0.084. Fifty iterations reserve 50 × $0.084, which is $4.20, and that number exists before the first call runs. LiteLLM's proxy reserves the estimated maximum cost by default, and its fail-closed mode rejects with a 503 when it cannot verify spend. Without any such ceiling, a stolen API key at METR spent about $600,000 of credits over about three weeks.

![What can actually stop the spend: the number and its source, as shown in the video](/videos/inference-internals-phase-3b/c5-number.webp)

### Key points

- **Remember.** only a pre-call reservation priced at the max_tokens worst case, held for the whole loop, stops spend before it happens.
- **The trap.** a provider hard cap looks like a guard, but its monthly interval and slow enforcement let a loop overspend inside the limit.
- **Try this.** compute N times the per-call worst case for your longest loop, and write that number next to the loop.

*This phase controls the spend, but it assumes the bill arrives per token from someone else's server. The next phase asks what changes when you rent a GPU and the bill becomes GPU hours.*

## Recap

- A cascade saves money only while the escalation rate stays below 1 minus the price ratio.
- A signal must beat an equal-count random control, ranked on dollars per correct answer.
- Spend extra confidence calls on different models, not on more samples of one.
- Watch per-request cost and cache hit rate, with the floor just below the measured normal.
- Only a pre-call reservation from max_tokens, held for the whole loop, stops the spend.

## Sources

- [FrugalGPT, the LLM cascade](https://arxiv.org/abs/2305.05176)
- [Bouchard, Is Escalation Worth It? (preprint)](https://arxiv.org/abs/2605.06350)
- [LLMRouterBench](https://arxiv.org/abs/2601.07206)
- [Ding, When LLMs Agree, Are They Right?](https://arxiv.org/abs/2607.08065)
- [ConfidenceBench](https://arxiv.org/abs/2607.20526)
- [METR, Update on Security at METR](https://metr.org/blog/2026-08-31-security-update)
- [LiteLLM budgets and reservations](https://docs.litellm.ai/docs/proxy/users)
- [OpenAI spend limits](https://developers.openai.com/api/docs/guides/spend-limits)
- [OpenAI Batch API guide](https://developers.openai.com/api/docs/guides/batch)
