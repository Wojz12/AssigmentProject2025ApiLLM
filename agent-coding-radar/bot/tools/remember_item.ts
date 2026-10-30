import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

type SeenEntry = {
  url: string;
  title: string;
  topicId: string;
  notedAt: string;
  why: string;
};

const SEEN_KEY = "radar:seen";
const MAX_SEEN = 200;

export default defineTool({
  description:
    "Remember a radar item so later digests can skip duplicates. Safe to call again with the same URL.",
  execution: "server",
  effect: "idempotent",
  inputSchema: z.object({
    url: z.string().url(),
    title: z.string().min(1).max(300),
    topicId: z
      .enum(["proof-driven", "agentic-coding", "agent-harness", "other"])
      .describe("Which watchlist topic this belongs to."),
    why: z.string().max(400).describe("One-line reason this mattered."),
  }),
  async execute({ url, title, topicId, why }, ctx) {
    const notedAt = new Date().toISOString();
    const existing = (await ctx.host.kv.get(SEEN_KEY)) as SeenEntry[] | null;
    const list = Array.isArray(existing) ? existing : [];
    const idx = list.findIndex((item) => item.url === url);
    const entry: SeenEntry = { url, title, topicId, notedAt, why };
    if (idx >= 0) {
      list[idx] = entry;
    } else {
      list.unshift(entry);
    }
    await ctx.host.kv.put(SEEN_KEY, list.slice(0, MAX_SEEN));
    return { saved: true, url, alreadyKnown: idx >= 0 };
  },
});
