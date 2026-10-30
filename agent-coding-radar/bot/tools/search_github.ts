import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import { fetchJson } from "../lib/http.js";

type GhRepoItem = {
  full_name?: string;
  html_url?: string;
  description?: string | null;
  stargazers_count?: number;
  updated_at?: string;
  language?: string | null;
};

type GhIssueItem = {
  html_url?: string;
  title?: string;
  state?: string;
  created_at?: string;
  updated_at?: string;
  body?: string | null;
  repository_url?: string;
};

type GhSearchResponse<T> = {
  total_count?: number;
  items?: T[];
  message?: string;
};

export default defineTool({
  description:
    "Search GitHub for repositories or issues/PRs about coding agents, eval harnesses, and proof-driven workflows.",
  execution: "server",
  effect: "read",
  timeArgs: ["updatedSince"],
  inputSchema: z.object({
    query: z.string().min(2).max(200).describe("GitHub search query (qualifiers allowed)."),
    kind: z.enum(["repositories", "issues"]).describe("Search repositories or issues/PRs."),
    updatedSince: z
      .string()
      .describe("Absolute ISO-8601 lower bound with timezone; filter results updated after this instant."),
    limit: z.number().int().min(1).max(15).optional().describe("Max items (default 8)."),
  }),
  async execute({ query, kind, updatedSince, limit }) {
    const sinceMs = Date.parse(updatedSince);
    if (Number.isNaN(sinceMs)) {
      return {
        ok: false,
        error: "updatedSince must be an absolute ISO-8601 instant with timezone",
      };
    }
    const day = updatedSince.slice(0, 10);
    const qualifier = kind === "repositories" ? `pushed:>=${day}` : `updated:>=${day}`;
    const q = `${query} ${qualifier}`.trim();
    const perPage = limit ?? 8;
    const url =
      `https://api.github.com/search/${kind}?` +
      new URLSearchParams({
        q,
        sort: kind === "repositories" ? "updated" : "updated",
        order: "desc",
        per_page: String(perPage),
      }).toString();

    const res = await fetchJson<GhSearchResponse<GhRepoItem & GhIssueItem>>(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!res.ok || !res.data) {
      return {
        ok: false,
        status: res.status,
        error: res.error ?? "GitHub search failed",
        items: [],
      };
    }
    if (res.data.message) {
      return { ok: false, status: res.status, error: res.data.message, items: [] };
    }

    const since = sinceMs;
    const items =
      kind === "repositories"
        ? (res.data.items ?? [])
            .filter((item) => {
              const t = item.updated_at ? Date.parse(item.updated_at) : 0;
              return t >= since;
            })
            .map((item) => ({
              kind: "repository" as const,
              name: item.full_name ?? null,
              url: item.html_url ?? null,
              description: item.description ?? null,
              stars: item.stargazers_count ?? 0,
              language: item.language ?? null,
              updatedAt: item.updated_at ?? null,
            }))
        : (res.data.items ?? [])
            .filter((item) => {
              const t = item.updated_at ? Date.parse(item.updated_at) : 0;
              return t >= since;
            })
            .map((item) => ({
              kind: "issue" as const,
              title: item.title ?? null,
              url: item.html_url ?? null,
              state: item.state ?? null,
              updatedAt: item.updated_at ?? null,
              createdAt: item.created_at ?? null,
              snippet: (item.body ?? "").slice(0, 280) || null,
            }));

    return {
      ok: true,
      kind,
      query: q,
      updatedSince,
      total: res.data.total_count ?? items.length,
      count: items.length,
      items,
    };
  },
});
