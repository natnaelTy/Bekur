import { prisma } from "@/lib/prisma";
import { generateMotivationLetter } from "@/lib/scholarships/generateMotivationalLetter";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const application = await prisma.scholarshipApplication.findUnique({
    where: { id: params.id },
    include: {
      userApplication: true,
      scholarship: true,
    },
  });

  if (!application) {
    return Response.json({ error: "Application not found" }, { status: 404 });
  }

  const content = await generateMotivationLetter({
    student: {
      fullName: application.userApplication.fullName,
      country: application.userApplication.country_applying_to,
      field: application.userApplication.program,
      level: application.userApplication.level,
      goals: application.userApplication.purpose,
    },
    scholarship: application.scholarship,
  });

  const letter = await prisma.motivationLetter.create({
    data: {
      scholarshipApplicationId: application.id,
      content,
    },
  });

  return Response.json(letter);
}
