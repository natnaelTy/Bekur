import { fetchScholarshipText } from "@/lib/scholarships/fetchScholarshipText";
import { extractScholarship } from "@/lib/scholarships/extractScholarship";
import { normalizeScholarship } from "@/lib/scholarships/normalizeScholarship";
import { prisma } from "@/lib/prisma";
import { validateScholarship } from "@/lib/scholarships/validateScholarship";



export async function POST(req: Request) {
  const { country, level } = await req.json();

  const query = `${country} ${level} scholarship official site`;

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  const text = await fetchScholarshipText(query);

  const extracted = await extractScholarship(text);

  const normalized = normalizeScholarship(extracted);

  if (!validateScholarship(normalized)) {
    return Response.json({ error: "Invalid scholarship" }, { status: 400 });
  }

  // Ensure array fields are passed as arrays to match schema
  const asArray = (v: any) => {
    if (v == null) return [] as string[];
    if (Array.isArray(v)) return v as string[];
    if (typeof v === "string" && v.trim() === "") return [] as string[];
    return [String(v)];
  };

  const data: any = {
    title: normalized.title ?? "",
    provider: normalized.provider ?? "",
    country: normalized.country ?? null,
    level: asArray(normalized.level),
    fields_of_study: asArray(normalized.fields_of_study),
    eligible_countries: asArray(normalized.eligible_countries),
    benefits: asArray(normalized.benefits),
    required_documents: asArray(normalized.required_documents),
    deadline: normalized.deadline ?? null,
    application_url: normalized.application_url ?? "",
    description: normalized.description ?? "",
  };

  await prisma.scholarship.create({ data });

  return Response.json({ normalized });
}
