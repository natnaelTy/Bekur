import { prisma } from "@/lib/prisma";
import { recommendScholarships } from "@/lib/scholarships/matching/recommendScholarships";

export async function POST(req: Request) {
  const data = await req.json();

  console.log("Received student data:", data);

  const studentProfile = {
    fullName: data.fullName,
    email: data.email,
    country_applying_to: data.country,
    level: (data.purpose === "study" ? "bachelor" : "master") as "bachelor" | "master" | "phd",
    field: data.field || "general",
    hasPassport: data.hasPassport === "yes",
  };
  console.log(studentProfile)
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
