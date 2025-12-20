import { searchScholarships } from "@/lib/scholarships/searchScholarships";

export async function POST(req: Request) {
  const params = await req.json();
  const results = await searchScholarships(params);
  return Response.json(results);
}
