---
name: digest-format
description: >-
  How to assemble a weekly or on-demand radar digest for proof-driven
  development and coding-with-agents. Use when writing a digest, briefing,
  or "co nowego" summary.
---

# Digest format

## Procedure

1. Call `list_watchlist`, then `list_seen`.
2. For each topic, run 1–2 `search_hn` queries and optionally one `search_github`.
   Use `since` / `updatedSince` = now minus 7–14 days, absolute ISO-8601 with `Z`.
3. Shortlist candidates with a real workflow, eval, harness, or case study.
4. `fetch_url` on items you plan to include (unless the HN/GitHub snippet is already enough).
5. Drop URLs already in `list_seen`.
6. Write the digest (Polish unless the user wrote in English). Max 5–7 items.
7. `remember_item` once per included URL.

## Ranking

Prefer, in order:
1. Proof / eval / harness with runnable steps
2. Named case study with outcome (what broke, what worked)
3. Changelog that changes how people run coding agents
4. High-signal discussion that introduces a durable pattern

Deprioritize: product launches without method, opinion pieces without evidence, duplicate coverage of the same launch.
