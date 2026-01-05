import { generateMotivationLetter } from "./generateMotivationalLetter";
import { prisma } from "@/lib/prisma";


export async function application( { id }: { id: string }) {
    
  const application = await prisma.scholarshipApplication.findFirst({
    where: { userApplicationId: id },
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
      country: "Ethiopia",
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

  console.log("Generated Letter:", letter);

  return Response.json(letter);
}
