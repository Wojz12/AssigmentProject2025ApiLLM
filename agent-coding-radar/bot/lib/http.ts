/** Shared HTTP helpers for radar tools. Caps keep tool results model-sized. */

const DEFAULT_TIMEOUT_MS = 12_000;
const MAX_TEXT_CHARS = 12_000;

export type FetchTextResult = {
  ok: boolean;
  status: number;
  url: string;
  contentType: string | null;
  text: string;
  truncated: boolean;
  error?: string;
};

export async function fetchJson<T>(
  url: string,
  init?: RequestInit,
): Promise<{ ok: boolean; status: number; data: T | null; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "agent-coding-radar/0.1 (+https://cursor.com)",
        ...(init?.headers ?? {}),
      },
    });
    if (!res.ok) {
      return { ok: false, status: res.status, data: null, error: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as T;
    return { ok: true, status: res.status, data };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: err instanceof Error ? err.message : String(err),
    };
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchText(url: string): Promise<FetchTextResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "text/html, application/xhtml+xml, text/plain, application/json;q=0.9, */*;q=0.8",
        "User-Agent": "agent-coding-radar/0.1 (+https://cursor.com)",
      },
      redirect: "follow",
    });
    const contentType = res.headers.get("content-type");
    const raw = await res.text();
    const stripped = stripToReadable(raw, contentType);
    const truncated = stripped.length > MAX_TEXT_CHARS;
    return {
      ok: res.ok,
      status: res.status,
      url: res.url || url,
      contentType,
      text: truncated ? stripped.slice(0, MAX_TEXT_CHARS) : stripped,
      truncated,
      error: res.ok ? undefined : `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      url,
      contentType: null,
      text: "",
      truncated: false,
      error: err instanceof Error ? err.message : String(err),
    };
  } finally {
    clearTimeout(timer);
  }
}

function stripToReadable(raw: string, contentType: string | null): string {
  const ct = (contentType ?? "").toLowerCase();
  if (ct.includes("json") || ct.includes("xml") || ct.includes("text/plain") || ct.includes("markdown")) {
    return raw.trim();
  }
  // Rough HTML → text: drop scripts/styles, tags, collapse whitespace.
  return raw
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
