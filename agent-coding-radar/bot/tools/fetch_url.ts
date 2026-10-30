import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import { fetchText } from "../lib/http.js";

export default defineTool({
  description:
    "Fetch a public URL and return truncated readable text. Use after search to verify a case study, changelog, or post.",
  execution: "server",
  effect: "read",
  inputSchema: z.object({
    url: z.string().url().describe("Absolute http(s) URL to fetch."),
  }),
  async execute({ url }) {
    if (!/^https?:\/\//i.test(url)) {
      return { ok: false, error: "Only http(s) URLs are allowed" };
    }
    const result = await fetchText(url);
    return {
      ok: result.ok,
      status: result.status,
      url: result.url,
      contentType: result.contentType,
      truncated: result.truncated,
      text: result.text,
      error: result.error,
    };
  },
});
