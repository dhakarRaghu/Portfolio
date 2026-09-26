---
title: "Sample note: a retry only helps when the check that triggers it can see the failure"
date: 2026-09-27
summary: "Draft for layout checks only. Not published."
tags: [agents, reliability]
category: agents
section: notes
draft: true
source: https://example.com/source
sourceTitle: "Placeholder source"
---

A retry loop raises the success rate of one step from p to about p / (1 - q), where q is the chance a failed attempt gets caught and retried. If the check misses most failures, q is small and the retry adds almost nothing. So the number to measure first is the recall of the check, not the retry count.
