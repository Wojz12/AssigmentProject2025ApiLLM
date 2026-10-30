import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import { SOURCES, TOPICS } from "../lib/watchlist.js";

export default defineTool({
  description:
    "Return the curated watchlist: topics (proof-driven development, coding with agents) and primary sources to check.",
  execution: "server",
  effect: "read",
  inputSchema: z.object({}),
  async execute() {
    return {
      topics: TOPICS,
      sources: SOURCES,
      guidance:
        "Prefer items from the last 7–14 days. Skip hype without a concrete workflow, eval, or case study.",
    };
  },
});
