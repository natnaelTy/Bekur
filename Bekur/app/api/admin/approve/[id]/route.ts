import { prisma } from "@/lib/prisma";


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { content, approved } = await req.json();

  const letter = await prisma.motivationLetter.findFirst({
    where: { scholarshipApplicationId: id },
  });

  if (!letter) {
    return Response.json(
      { error: "Motivation letter not found for application" },
      { status: 404 }
    );
  }

  const updated = await prisma.motivationLetter.update({
    where: { id: letter.id },
    data: {
      content,
      approved,
      approvedAt: approved ? new Date() : null,
    },
  });

  await prisma.scholarshipApplication.update({
    where: { id },
    data: {
      status: approved ? "APPROVED" : "IN_PROGRESS",
    },
  });

  return Response.json(updated);
}
