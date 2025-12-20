import { fetchScholarshipText } from "@/lib/scholarships/fetchScholarshipText";
import { extractScholarship } from "@/lib/scholarships/extractScholarship";
import { saveScholarship } from "@/lib/scholarships/saveScholarship";

export async function POST(req: Request) {
  const { url } = await req.json();

  const text = await fetchScholarshipText(url);
  const structured = await extractScholarship(text);
  await saveScholarship(structured);

  return Response.json({ status: "ingested" });
}
