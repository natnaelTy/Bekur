import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { approved } = await req.json();
  const { id } = await params;

  if (!approved) {
    return Response.json({ status: "Rejected" });
  }

  await prisma.scholarshipApplication.update({
    where: { id },
    data: { status: "APPROVED" },
  });

  return Response.json({ success: true });
}
