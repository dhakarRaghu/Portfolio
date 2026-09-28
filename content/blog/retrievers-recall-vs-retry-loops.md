---
title: "A 60% retriever can reach 99% success when an agent retries"
date: 2026-09-28
summary: "When an agent retries its search, better retriever recall barely changes the result. So the shape of your system decides which number to measure first."
tags: [retrieval, agents, evals, recall]
category: retrieval
section: blog
---
**In short:** If one search finds the right chunk 60% of the time, five independent searches find it at least once 99% of the time. Raising the retriever from 60% to 75% then moves the result by less than one percentage point. So for a system that searches once, measure retriever recall first. For an agent that retries, measure end to end: whether the whole task succeeds.

You spend a week on your retriever, and its recall goes from 60% to 75%. Recall is the share of relevant chunks that the search returns. Then you run the agent that uses this retriever, and its results barely change. The gain in the retriever is real. The agent's retries make it hard to see.

## An agent that retries can succeed with simple search

Colin Flaherty, previously a founding engineer at Augment, built an agent for SWE-Bench Verified. SWE-Bench Verified is a benchmark where an agent must change code to fix a described problem. Jason Liu hosted him for a talk and wrote it up as [Why Grep Beat Embeddings in Our SWE-Bench Agent](https://jxnl.co/writing/2025/09/11/why-grep-beat-embeddings-in-our-swe-bench-agent-lessons-from-augment/). The write-up says his team's agent reached the top of the leaderboard, the public ranking of results on that benchmark.

The agent searched with grep and find, two plain text-search commands. When a search failed, it tried a different one until it found what it needed. The team also tested search tools built on embeddings, where an embedding is a list of numbers that lets a search match meaning instead of exact words. For these tasks, grep and find were enough. The write-up explains why: the agent kept trying, and that made up for its simple tools.

## The arithmetic of retries

The effect is easy to compute. Say one search finds the right chunk with probability r, and the agent makes n searches that are independent of each other. All n searches fail with probability (1 − r)^n. So at least one search succeeds with probability 1 − (1 − r)^n.

| Recall of one search | System that searches once | Agent with 5 independent searches |
|---|---|---|
| 60% | 60% | 99.0% |
| 75% | 75% | 99.9% |

For r = 0.6 and n = 5, the result is 1 − 0.4^5 = 1 − 0.01024, about 99.0%. For r = 0.75, it is 1 − 0.25^5 = 1 − 0.00098, about 99.9%. In a system that searches once, the week of work adds 15 percentage points, from 60% to 75%. Inside the agent, it adds less than one point, from 99.0% to 99.9%.

This table is arithmetic, not a measurement from either article. It puts numbers on the point the write-up reports from Flaherty: "improving embedding models doesn't necessarily improve end-to-end performance because agents are persistent".

## The shape of your system decides what you measure first

The two articles seem to give opposite advice. In [Systematically Improving RAG Applications](https://jxnl.co/writing/2025/01/24/systematically-improving-rag-applications/), Liu measures the retriever's recall first. In the write-up, Flaherty starts with 5 to 10 examples checked end to end, and only then moves to numbers. The arithmetic suggests why each piece of advice fits its own kind of system.

| Your system | What limits the result | Measure first |
|---|---|---|
| Searches once, then answers | Recall of that one search | Retriever recall, for each type of question |
| An agent that retries its search | Whether the task succeeds | End-to-end success on real tasks |

End-to-end success means the agent finished the task correctly, judged on its final result and not on any single search. With an agent, you still measure the retriever, but to explain a failed task, not to set a target. Flaherty also gives a test for adding a second search tool to an agent. Imagine a person doing this task who never gets tired. Would another search tool help that person?

## Where this stops working

- The 99% needs independent searches, and an agent's searches are not independent. Each search learns from the last one, and that can help. But when the answer uses words that no query tries, all five searches can fail together. Then the real result is lower than the table shows. To check your own agent, count how often all of its searches fail on a task, and compare that with (1 − r)^n. For r = 0.6 and n = 5, that is about 1%.
- Retries cost time and model calls. In his RAG article, Liu notes that long queries or multi-step calls can mean 2 to 10 seconds of latency.
- The grep result comes from SWE-Bench, which Flaherty calls somewhat artificial. Its repositories are smaller than real codebases, and 90% of its problems take a good engineer less than an hour. He also says grep does not scale well to large codebases, and that it struggles with unstructured text such as Slack messages or documentation.
- The leaderboard position is stated in the write-up. It was not checked against the leaderboard.

## Measure the result your user sees

A retriever with 60% recall can reach 99% success inside an agent that retries, when the retries are independent. So a gain in retriever recall can be real and still not change what the user sees. If your system searches once, measure recall first; the post [Measure retrieval recall per segment before you buy a vector database](/blog/measure-recall-before-you-buy-a-vector-database) has a script for that. If an agent retries, measure whether its tasks succeed.
