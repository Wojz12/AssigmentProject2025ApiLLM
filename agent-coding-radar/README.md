# agent-coding-radar

Agent SDK radar śledzący **proof-driven development** i **coding z agentami**: case studies, eval harnessy, changelogi, praktyczne workflowy.

## Co robi

- Trzyma curated watchlistę tematów (PDD, agentic coding, harness/runtime)
- Szuka na Hacker News i GitHubie, weryfikuje źródła przez `fetch_url`
- Składa krótki digest (PL) i deduplikuje URL-e w `host.kv`
- Cotygodniowy schedule: poniedziałek `08:00` UTC (`bot/schedules/weekly-digest.md`)

## Lokalnie

```bash
cd agent-coding-radar
npx @grok/agent-sdk login
npx @grok/agent-sdk dev
# playground: http://127.0.0.1:3000/agent-coding-radar/playground

npx @grok/agent-sdk run --dir . --message "Zrób tygodniowy radar PDD + coding z agentami"
npx @grok/agent-sdk eval --dir . --tag smoke
```

Schedule w `--dev` nie odpala się sam:

```bash
curl -X POST http://127.0.0.1:3000/agent-coding-radar/v1/dev/schedules/weekly-digest
```

## Deploy

Zobacz `npx @grok/agent-sdk docs` / skill deploy. Pierwszy `deploy` zrób u siebie (alias token).
