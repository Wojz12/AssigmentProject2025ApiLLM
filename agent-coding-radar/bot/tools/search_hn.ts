import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import { fetchJson } from "../lib/http.js";

type HnHit = {
  objectID?: string;
  title?: string;
  url?: string | null;
  points?: number | null;
  num_comments?: number | null;
  created_at?: string;
  author?: string;
  story_text?: string | null;
};

type HnSearchResponse = {
  hits?: HnHit[];
  nbHits?: number;
};

export default defineTool({
  description:
    "Search Hacker News (Algolia) for stories about proof-driven development, coding agents, evals, and related topics.",
  execution: "server",
  effect: "read",
  timeArgs: ["since"],
  inputSchema: z.object({
    query: z.string().min(2).max(200).describe("Search query."),
    since: z
      .string()
      .describe(
        "Absolute ISO-8601 lower bound with timezone (e.g. 2026-10-23T00:00:00Z). Only stories created after this instant.",
      ),
    limit: z.number().int().min(1).max(20).optional().describe("Max hits (default 8)."),
  }),
  async execute({ query, since, limit }) {
    const sinceMs = Date.parse(since);
    if (Number.isNaN(sinceMs)) {
      return { ok: false, error: "since must be an absolute ISO-8601 instant with timezone" };
    }
    const sinceSec = Math.floor(sinceMs / 1000);
    const hitsPerPage = limit ?? 8;
    const url =
      `https://hn.algolia.com/api/v1/search?` +
      new URLSearchParams({
        query,
        tags: "story",
        numericFilters: `created_at_i>${sinceSec}`,
        hitsPerPage: String(hitsPerPage),
      }).toString();

    const res = await fetchJson<HnSearchResponse>(url);
    if (!res.ok || !res.data) {
      return { ok: false, status: res.status, error: res.error ?? "search failed", items: [] };
    }

    const items = (res.data.hits ?? []).map((hit) => ({
      id: hit.objectID ?? null,
      title: hit.title ?? "(untitled)",
      url: hit.url ?? (hit.objectID ? `https://news.ycombinator.com/item?id=${hit.objectID}` : null),
      points: hit.points ?? 0,
      comments: hit.num_comments ?? 0,
      createdAt: hit.created_at ?? null,
      author: hit.author ?? null,
      snippet: (hit.story_text ?? "").slice(0, 280) || null,
    }));

    return { ok: true, query, since, count: items.length, items };
  },
});
