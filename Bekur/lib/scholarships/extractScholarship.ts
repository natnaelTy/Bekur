

export async function extractScholarship(text: string) {
  const prompt = `
Extract scholarship info as JSON.
Fields:
title, country, level, deadline, eligibility, documents, applicationUrl

Text:
${text.slice(0, 12000)}
`;

  const res = await fetch(process.env.AI_ENDPOINT!, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  return JSON.parse(data.choices[0].message.content);
}
