import { prisma } from "@/lib/prisma";
import { recommendScholarships } from "@/lib/scholarships/matching/recommendScholarships";

export async function POST(req: Request) {
  const body = await req.json();

  const studentProfile = {
    fullName: body.fullName,
    email: body.email,
    country_applying_to: body.country,
    level: (body.purpose === "study" ? "bachelor" : "master") as "bachelor" | "master" | "phd",
    field: body.field || "general",
    hasPassport: body.hasPassport === "yes",
  };

  const scholarships = (await prisma.scholarship.findMany()).map((s) => ({
    ...s,
    country: s.country ?? "",
  })) as any;

  const result = recommendScholarships(scholarships, studentProfile);

  return Response.json({
    student: studentProfile,
    message: result.message,
    recommendations: result.data.slice(0, 5),
  });
}
