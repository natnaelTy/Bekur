import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const application = await prisma.application.create({
    data: {
      studentEmail: body.email,
      scholarshipId: body.selectedScholarshipId,
      status: "submitted",
      submittedAt: new Date(),
    },
  });

  return Response.json(application);
}
