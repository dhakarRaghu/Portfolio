---
title: "Sample note: recall is the ceiling of a retrieval system"
date: 2026-09-26
summary: "Draft for layout checks only. Not published."
tags: [retrieval, evals]
category: retrieval
section: notes
draft: true
---

A reranker can only reorder what the first stage returned. If the right chunk was never retrieved, no prompt change, model upgrade or reranker recovers it. So measure first-stage recall per segment before buying any infrastructure.
