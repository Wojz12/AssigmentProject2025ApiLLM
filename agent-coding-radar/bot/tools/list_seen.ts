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

export default defineTool({
  description: "List recently remembered radar items to avoid repeating them in a digest.",
  execution: "server",
  effect: "read",
  inputSchema: z.object({
    limit: z.number().int().min(1).max(50).optional().describe("Max items (default 20)."),
  }),
  async execute({ limit }, ctx) {
    const existing = (await ctx.host.kv.get(SEEN_KEY)) as SeenEntry[] | null;
    const list = Array.isArray(existing) ? existing : [];
    const n = limit ?? 20;
    return { count: Math.min(n, list.length), items: list.slice(0, n) };
  },
});
