---
title: "Mission HQ"
date: 2026-09-01
summary: "A self-hosted multi-agent system I run on my own laptop. Agents share one task board and one markdown vault, study with me, write my daily note and draft what I publish. No agent can post, send or publish anything; I do that."
tags: [Python, DBOS, Pydantic AI, FastAPI, Telegram, Next.js, PostgreSQL]
section: projects
draft: false
period: "Sep 2026 to now"
role: "Solo"
status: active
featured: true
---

The backend is Python 3.12 with DBOS for durable workflows, Pydantic AI for the agent loop, FastAPI, and python-telegram-bot. The console is Next.js. Agent code never names a model provider: each agent declares a role, and one file maps roles to models, so I can switch models without touching an agent.

Every tool call is classed as notify, read, vault write, external write or spend. External writes and spend stop the run and open an approval ticket for me. An agent that reads the web may write only to a quarantine folder, and text from the web can never enter a policy file.

The source is private for now.
