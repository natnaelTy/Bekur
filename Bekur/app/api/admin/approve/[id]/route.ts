import { prisma } from "@/lib/prisma";


export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { content, approved } = await req.json();

  const updated = await prisma.motivationLetter.update({
    where: { id: params.id },
    data: {
      content,
      approved,
      approvedAt: approved ? new Date() : null,
    },
  });

  return Response.json(updated);
}
