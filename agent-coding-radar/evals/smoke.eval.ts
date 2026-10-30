import { defineEval } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  description: "On a digest request the agent loads the watchlist before searching.",
  async test(t) {
    await t.send(
      "Zrób krótki radar: tylko pokaż watchlistę tematów (list_watchlist). Na razie nic nie szukaj w sieci.",
    );
    t.succeeded();
    t.calledTool("list_watchlist");
    t.notCalledTool("search_hn");
    t.notCalledTool("search_github");
  },
});
