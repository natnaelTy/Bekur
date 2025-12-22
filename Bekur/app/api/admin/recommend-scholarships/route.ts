import { prisma } from "@/lib/prisma";
import { recommendScholarships } from "@/lib/scholarships/matching/recommendScholarships";

export async function POST(req: Request) {
  const body = await req.json();

  const studentProfile = {
    fullName: body.fullName,
    email: body.email,
    country: body.country,
    level: body.purpose === "study" ? "bachelor" : "master",
    field: body.field || "general",
    hasPassport: body.hasPassport === "yes",
  };

  const scholarships = await prisma.scholarship.findMany();

  const recommended = recommendScholarships(scholarships, studentProfile);
  console.log(recommended);
  
  return Response.json({
    student: studentProfile,
    recommendations: recommended.slice(0, 5), 
  });
}
