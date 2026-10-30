/** Curated topics and sources for the coding-with-agents radar. */

export type WatchTopic = {
  id: string;
  label: string;
  hnQueries: string[];
  githubQueries: string[];
  why: string;
};

export type WatchSource = {
  id: string;
  label: string;
  url: string;
  kind: "blog" | "changelog" | "docs" | "community";
};

export const TOPICS: WatchTopic[] = [
  {
    id: "proof-driven",
    label: "Proof-driven development",
    hnQueries: [
      "proof-driven development",
      "eval-driven development agents",
      "LLM eval harness coding agents",
      "property based testing agents",
    ],
    githubQueries: [
      "proof driven development agent",
      "agent eval harness",
      "defineEval agent sdk",
    ],
    why: "Budowanie z dowodem: evale, harnessy, testy jako brama przed merge/deploy.",
  },
  {
    id: "agentic-coding",
    label: "Coding with agents",
    hnQueries: [
      "coding agents",
      "Cursor agent",
      "Claude Code",
      "agentic software engineering",
      "AI pair programming case study",
    ],
    githubQueries: [
      "coding agent",
      "agent sdk cursor",
      "software engineering agents",
    ],
    why: "Praktyka kodowania z agentami: workflow, case studies, narzędzia.",
  },
  {
    id: "agent-harness",
    label: "Agent harness & runtime",
    hnQueries: [
      "agent sdk",
      "MCP tools agents",
      "agent memory durable",
      "multi agent coding",
    ],
    githubQueries: ["model context protocol agent", "agent harness"],
    why: "Runtime agentów: SDK, MCP, pamięć, schedulery, channels.",
  },
];

export const SOURCES: WatchSource[] = [
  {
    id: "cursor-docs-bdk",
    label: "Cursor Agent SDK / BDK docs",
    url: "https://cursor.com/docs/bdk",
    kind: "docs",
  },
  {
    id: "cursor-changelog",
    label: "Cursor changelog",
    url: "https://cursor.com/changelog",
    kind: "changelog",
  },
  {
    id: "simonw-blog",
    label: "Simon Willison (agents / evals)",
    url: "https://simonwillison.net/",
    kind: "blog",
  },
  {
    id: "anthropic-engineering",
    label: "Anthropic engineering",
    url: "https://www.anthropic.com/engineering",
    kind: "blog",
  },
  {
    id: "openai-agents",
    label: "OpenAI agents / cookbook",
    url: "https://developers.openai.com/blog",
    kind: "blog",
  },
];
