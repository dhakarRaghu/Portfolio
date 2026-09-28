---
title: "Measure retrieval recall per segment before you buy a vector database"
date: 2026-09-28
summary: "A 30-line script measures how often your search returns the right chunk, for each type of question. The weak type tells you what to fix first."
tags: [rag, retrieval, evals, recall]
category: retrieval
section: blog
draft: true
---
**In short:** An average recall of 70% can hide a type of question where recall is 5%. A short script can measure recall for each type of question on your own documents, with test questions written by a model. When one type scores low, first check whether the answer exists in your data at all.

A support bot answers a customer with confidence, and the answer is wrong. You change the prompt. You try a newer model. The answer stays wrong. One possible cause sits earlier in the system: the chunk that holds the answer never reached the prompt. A chunk is one piece of a document that is stored and searched on its own.

## Low recall limits every step after the search

RAG, retrieval-augmented generation, means the system first searches your documents and then gives the chunks it found to the model. Two numbers describe that search. Precision is the share of returned chunks that are relevant. Recall is the share of relevant chunks that come back.

In [Systematically Improving RAG Applications](https://jxnl.co/writing/2025/01/24/systematically-improving-rag-applications/), Jason Liu writes that in most RAG systems recall is the bigger problem, because you usually cannot answer a question if you never retrieve the right chunk. A later step cannot bring a chunk back either. A reranker, a second model that re-orders chunks, can only choose among the chunks that the search handed to it.

## A model can write the test questions

To measure recall, you need questions whose answers you already know. Liu's method gets them without people labelling data. For each chunk, you ask a model to write 5 questions that the chunk answers. Each question now has a known source chunk.

A question passes when its source chunk is among the first k chunks the search returns. The share of questions that pass is the hit rate at k. It equals recall when only one chunk answers each question.

## The average hides the type of question that fails

Liu gives an example. A recall of 70% looks fine, but it can be an average over many easy questions. The questions that matter most, such as multi-hop questions or questions with a date filter, might have a recall of 5%. A multi-hop question needs facts from two or more chunks. The 70% and the 5% are his illustration, not a measurement.

So each question gets a segment, a label for its type. Liu suggests three kinds of label: the topic, such as pricing or technical questions; the complexity, such as single-hop or multi-hop; and the user role, such as new or experienced users. Then you read recall for each segment, and not only the average.

## The script

The method fits in 30 lines of Python with no outside libraries. You give it two functions: one that calls your model, and one that gives each question its segment. The keyword search is a stand-in, so the script runs without a vector database. Replace it with your own search.

```python
import re
from collections import Counter, defaultdict


COMMON = {"a", "an", "the", "is", "are", "do", "does", "i", "of", "to", "in", "on",
          "for", "and", "how", "what", "when", "which", "where", "can", "my", "it"}


def words(text):
    return Counter(w for w in re.findall(r"[a-z0-9]+", text.lower()) if w not in COMMON)


def keyword_retriever(chunks):
    """A stand-in search that ranks chunks by shared words. Replace it with yours."""
    counts = [words(c) for c in chunks]

    def retrieve(query, k=3):
        q = words(query)
        scores = [sum(min(c[w], q[w]) for w in q) for c in counts]
        ranked = sorted(range(len(chunks)), key=lambda i: -scores[i])
        return [i for i in ranked[:k] if scores[i] > 0]

    return retrieve


def make_eval_set(chunks, ask_model, segment_of):
    """One (question, source chunk, segment) row for each generated question."""
    rows = []
    for i, chunk in enumerate(chunks):
        reply = ask_model(f"Write 5 questions that this text answers, one per line:\n\n{chunk}")
        for line in reply.splitlines():
            question = re.sub(r"^[\s*-]*(?:\d+[.)])?[\s*]*", "", line).strip()
            if question.endswith("?"):  # skips lines such as "Here are 5 questions:"
                rows.append((question, i, segment_of(question)))
    return rows


def hit_rate_by_segment(rows, retrieve, k=3):
    hits = defaultdict(list)
    for question, source, segment in rows:
        hits[segment].append(source in retrieve(question, k))
    return {seg: round(sum(h) / len(h), 2) for seg, h in hits.items()}
```

Here is one run on a toy corpus: six made-up help-centre chunks and 10 questions written by hand in place of a model. A question is labelled "time" when it asks about a date or a period. A question passes when its chunk is in the first 3 results.

```
plain miss How long does a refund take?
plain miss Where does the refund money go?
plain hit  How much is the Pro plan?
plain hit  How many seats come with Pro?
time  hit  Since when are bills issued at the start of the month?
plain miss How do I download every ticket?
plain hit  Which format is the ticket export?
time  hit  How many seats did the free tier have in early 2025?
time  hit  What changed for free users last year?
time  hit  When does a password reset link stop working?
{'plain': 0.5, 'time': 1.0}
```

The toy numbers are not a measurement of any real system. With 6 chunks and 10 questions, the scores mean nothing, and here the time questions even did better than the plain ones. The misses are still worth reading. Two questions say "refund" while the chunk says "Refunds". One asks to "download every ticket" while the chunk says "export all tickets". The keyword search counts only exact words, so a plural or a different word for the same thing is a miss. An embedding search is meant to handle this case. An embedding is a list of numbers that places texts with similar meaning close together. The lines for each question tell you which kind of search to test next.

## A low segment has two different causes

When a segment scores low, first ask whether the answer is in your data at all. Liu calls the two cases inventory and capability. An inventory problem means the data is missing. His examples are a whole subfolder of documents that was never ingested, and a database column that was never ingested. To ingest data means to load it into the search. A capability problem means the data is there, but the search does not find it.

Only a capability problem is fixed by a better search or a new embedding model. An inventory problem is fixed in the pipeline that loads your data. Generated questions cannot find an inventory problem, because they are written from chunks you already have. To find one, take real user questions from the low segment and look for the answer in your source documents by hand.

## Where this stops working

- A question written from a chunk can reuse the chunk's words, and real users do not know those words. So the score from generated questions can be higher than the score for real users. Liu's advice is to blend in real user questions as they arrive.
- The script counts one source chunk for each question. It does not measure multi-hop questions correctly, because they need two or more chunks. For those, write each question from a pair of chunks, and count a pass only when both are returned.
- The script was run only on the toy corpus above. It has not been measured on a real document set.
- An agent that retries its searches changes which number matters. The post [A 60% retriever can reach 99% success when an agent retries](/blog/retrievers-recall-vs-retry-loops) covers that case.

## Find the failing segment before you pay to change the search

Measure recall for each segment on your own documents, and read the questions that missed. When a segment is low, check whether its answers exist in your data before you change the search. A vector database, a database that stores embeddings and searches them, can only fix a capability problem. So can a new embedding model.
