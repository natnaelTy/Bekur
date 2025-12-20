import { JSDOM } from "jsdom";

export async function fetchScholarshipText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  const html = await res.text();
  const dom = new JSDOM(html);
  return dom.window.document.body.textContent || "";
}
