export async function fetchScholarshipText(query: string): Promise<string> {
  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": process.env.SERPER_API_KEY!,
    },
    body: JSON.stringify({
      q: query,
      num: 5,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Serper error:", errorText);
    throw new Error("Serper fetch failed");
  }

  const data = await res.json();

  let combinedText = "";

  for (const r of data.organic || []) {
    combinedText += `
Title: ${r.title}
Snippet: ${r.snippet}
URL: ${r.link}
`;
  }

  if (combinedText.trim().length === 0) {
    throw new Error("Serper returned empty results");
  }

  return combinedText;
}
