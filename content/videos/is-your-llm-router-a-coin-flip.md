---
title: "Is Your LLM Router a Coin Flip?"
date: 2026-10-04
summary: "Your team tests two cascades: each tries a cheap model first and passes unsure queries to a strong model. Both dashboards show 85% accuracy at 69% of the strong model's cost, and one of them picks the queries it passes on with a coin flip. This video builds the test that tells them apart, and picks the signal worth building."
tags: [llm-router, llm-cascade, model-routing, random-control, ab-testing-llm, self-consistency]
playlist: inference-internals
order: 9
part: "#9"
youtube: ""
duration: "11:57"
thumbnail: "/videos/inference-internals-09.webp"
chapters:
  - "0:00 Two dashboards, one coin flip"
  - "0:34 What does a cascade cost?"
  - "3:59 Which test exposes a coin flip?"
  - "7:34 Which signal deserves your extra calls?"
  - "11:05 Recap"
draft: false
---

Your team tests two cascades, which try a cheap model first and pass unsure queries to a strong model. Both dashboards show 85% accuracy at 69% of the strong model's cost, but one cascade picks those queries with a coin flip. So how do you tell the two apart before you ship one, and what should the real signal be?

Three questions follow: what a cascade costs, which test exposes a coin flip, and which signal to build.

## 1. What does a cascade cost?

**Before you compare the two signals, price the cascade itself, because it pays the cheap model on every query.**

### The situation

Today your team runs strong-only, which sends every query to the strong model at $5 per million tokens. The cheap model costs $1 per million tokens, so both cascades promise a saving on the easy queries.

### The picture

There are two ways to split traffic between a cheap model and a strong model. A cascade sends every query to the cheap model, reads its answer, and sends the unsure ones on to the strong model. A router reads the query first and sends it to one model, so only that model runs. In both shapes, the share of queries that reach the strong model is called the escalation rate, e. The cascade still has a reason to exist, because its signal reads a finished answer while the router sees only the prompt.

### Think it through

Your cheap model costs $1 per million tokens, and your strong model costs $5. At what escalation rate does the cascade stop saving money?

A first thought is that the cascade always saves, because the cheap model is five times cheaper.

That thought is reasonable, but it misses that a query which gets escalated runs both models, not one.

So the real question is how many queries can pay twice before the total passes $5.

### The mechanism, step by step

<img src="/videos/inference-internals-09/c1-mechanism.webp" alt="The mechanism, as drawn in the video for: What does a cascade cost?" width="1280" height="616" loading="lazy" decoding="async" />

1. Every query enters through the cheap model, so every query pays 1, with no e in front of it.
2. Escalation adds a second answer on top of the first, so an escalated query pays 1 plus 5, which is 6.
3. The cascade loses when 1 + 5e is more than 5, so the break-even is e = 0.8, or 80%.
4. In general, the cascade saves money only while e stays below 1 minus the cheap price divided by the strong price.

### The number

Now your two cascades, which each escalate about half of all queries, so e is 0.5. Each one costs 1 + 0.5 × 5, which is 3.5, or 70% of strong-only, close to the 69% on both dashboards. A router at the same rate pays once per query, so it costs 0.5 + 2.5, which is 3, or 60%. The 10-point gap is the cheap answer the cascade paid for on every escalated query and did not use. Across five benchmarks and eight models, a light router beat the best cascade on four of five datasets. The paper names this double payment as the main cause, and not a better routing signal.

<img src="/videos/inference-internals-09/c1-number.webp" alt="The number and its source, as shown in the video for: What does a cascade cost?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** A cascade costs the cheap price plus e times the strong price, so it saves only while e stays under 1 minus the cheap price divided by the strong price.
- **The trap.** An escalated query pays both models, so a cascade that escalates more than 80% costs more than no cascade.
- **Try this.** Take your two models' prices, compute 1 minus the cheap price divided by the strong price, and compare it with your escalation rate.

Now look at what the formula leaves out, because the cost depends on how many queries escalate, not on which ones. Your colleague's tuned signal and the coin flip both escalate half the queries, so the formula gives them the same cost. So the costs match by arithmetic, and only a test of which queries each one picks can tell them apart.

## 2. Which test exposes a coin flip?

**That test is a random control, and only a control that escalates the same count proves your signal knows something.**

### The situation

Cascade A uses the signal your colleague tuned for a week, and cascade B escalates each query with probability 0.5. Both dashboards show 85% accuracy at 69% of strong-only cost, so neither number tells you which one to ship.

### The picture

The fix is one more row in your results table, and that row is called a random control. A random control is a second cascade that escalates the same number of queries as yours, on the same traffic. The only difference is that it picks those queries at random, so it shows what chance alone would buy.

### Think it through

Cascade B escalates at random, and its dashboard still shows 85% accuracy. Why does a coin flip look as good as a tuned signal?

A first thought is that a random signal must show worse accuracy, because it escalates the wrong queries.

That sounds reasonable, but any escalation swaps some cheap answers for strong answers, so it buys accuracy even by luck.

So the real question is whether your signal picks better queries than chance picks, at the same cost.

### The mechanism, step by step

<img src="/videos/inference-internals-09/c2-mechanism.webp" alt="The mechanism, as drawn in the video for: Which test exposes a coin flip?" width="1280" height="616" loading="lazy" decoding="async" />

1. Run your real cascade, and record its accuracy and its cost per query.
2. Run the control with the same escalation rate and random picks, so both runs cost the same.
3. Rank both on dollars per correct answer, which is the total spend divided by the count of correct answers. Accuracy alone ignores what each answer cost, and cost alone ignores how many answers were wrong, so this one number counts both.
4. Subtract the control from your signal, and keep the standard error, the usual spread of that gap from run to run. A gap smaller than about two standard errors can appear by chance alone, so you trust only a larger gap.

### The number

In the course simulation, a coin-flip signal still showed 85% accuracy at 69.3% of strong-only cost. Against the equal-count random control its gap was 0.4 points, inside two standard errors, so the control showed it carried no information. One small trial can also mislead you, because with about 20 items per run one accuracy number moves by roughly 7 points. The same coin-flip signal, run with three random seeds, printed gaps of +10, 0 and −5 points, so seed one would ship it. The same test applies to a router, because a router also picks which queries reach the strong model. A benchmark that re-ran 10 routing baselines found several, including commercial routers, that fail to reliably beat a simple baseline.

<img src="/videos/inference-internals-09/c2-number.webp" alt="The number and its source, as shown in the video for: Which test exposes a coin flip?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** A real signal must beat a random control that escalates the same count, ranked on dollars per correct answer.
- **The trap.** 85% accuracy at 69% of strong-only cost can describe a coin flip, so you would ship noise at strong-model prices.
- **Try this.** Run your comparison with three seeds, and see how far one 20-item trial's gap moves.

The control tells you whether a signal works, but every signal you test costs extra model calls to build and run. Your teammate proposes the cheapest one, which samples the model five times and accepts the answer when the samples agree. The same proposal also accepts any answer the model rates above 90% confident, so it never escalates those queries.

## 3. Which signal deserves your extra calls?

**Both halves of that proposal trust one model to judge itself, and on strong models its samples repeat its own mistakes.**

### The situation

If five samples all say Paris, the answer feels safe, so your teammate plans to accept it without escalating. A stated confidence of 90% feels safe in the same way, because the model itself says it is probably right.

### The picture

Self-consistency is the signal of sampling one model several times and accepting the answer that most samples agree on. Stated confidence is the signal of asking the model how sure it is, in words or as a percentage. A cross-model jury sends the same query to two or three different models and checks whether they agree.

### Think it through

An audit samples a frontier model, one of the strongest available, 50 times on each question. On 77% of questions the samples strongly agree, so what share of those answers do you expect to be wrong?

A first thought is very few, because 40 of 50 samples on one answer looks like strong evidence.

That is reasonable for independent measurements, but these samples all come from the same weights, so they share the same mistakes.

So the real question is whether agreement measures the truth of the answer or the bias of the model.

### The mechanism, step by step

<img src="/videos/inference-internals-09/c3-mechanism.webp" alt="The mechanism, as drawn in the video for: Which signal deserves your extra calls?" width="1280" height="616" loading="lazy" decoding="async" />

1. A model that learned a wrong rule gives the same wrong answer on every sample, so its samples cluster on that answer.
2. A model that prefers an option because of its position picks it every time, so agreement grows without accuracy.
3. Different models are trained differently, so their mistakes land in different places and only the correct answer collects agreement.
4. Stated confidence is scored with the Brier score, the mean squared gap between confidence and correctness, where 0 is perfect.

### The number

On 265,000 samples, the most consistent frontier model agreed strongly on 77% of questions, and 48% of those answers were wrong. So a cascade that accepts every agreeing answer lets about 37 of every 100 questions through unescalated and wrong. Stated confidence is weak too, because the best of 15 frontier models scored a Brier of 0.103, against 0.1875 for a calibrated random guesser. One shipped model scored 0.367, about twice as bad as guessing, and the most accurate model was not the best calibrated one. So you calibrate your own model's stated confidence on your own queries before you trust it as a signal.

<img src="/videos/inference-internals-09/c3-number.webp" alt="The number and its source, as shown in the video for: Which signal deserves your extra calls?" width="1280" height="616" loading="lazy" decoding="async" />

### Key points

- **Remember.** Agreement among samples of one model measures that model's bias, so spend confidence calls on different models.
- **The trap.** Accepting an answer because five samples agree accepts wrong answers 48% of the time on the most consistent frontier model.
- **Try this.** Ask your model for its confidence on ten questions you know the answers to, and compare it with what was right.

So you build a cross-model jury as the signal, and you test it the same way as the two cascades. Run it beside an equal-count random control on the same traffic, and count the jury's extra calls in the total spend. If its gap on dollars per correct answer passes two standard errors, the signal carries information and you can ship it. A cascade whose gap stays inside two standard errors is the coin flip, whatever its dashboard shows.

## Recap

- A cascade pays the cheap model on every query, so it saves only while e stays below 1 minus the cheap price divided by the strong price.
- Only an equal-count random control, ranked on dollars per correct answer and checked against its standard error, proves a signal works.
- Samples of one model repeat its own mistakes, so spend your extra calls on a jury of different models.

## Sources

- [FrugalGPT, the cascade definition](https://arxiv.org/abs/2305.05176)
- [Bouchard, Is Escalation Worth It? (preprint)](https://arxiv.org/abs/2605.06350)
- [LLMRouterBench](https://arxiv.org/abs/2601.07206)
- [Ding, When LLMs Agree, Are They Right?](https://arxiv.org/abs/2607.08065)
- [ConfidenceBench](https://arxiv.org/abs/2607.20526)
- [OpenAI Batch guide](https://developers.openai.com/api/docs/guides/batch)
