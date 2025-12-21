

import { fetchScholarshipText } from "@/lib/scholarships/fetchScholarshipText";
import { extractScholarship } from "@/lib/scholarships/extractScholarship";

export async function POST(req: Request) {
  const { country, level } = await req.json();

  const query = `${country} ${level} scholarship official site`;

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  const text = await fetchScholarshipText(query);

  console.log("Fetched text length:", text.length);
  console.log("Fetched text sample:", text.slice(0, 300));

  const extracted = await extractScholarship(text);

  return Response.json({ extracted });
}
