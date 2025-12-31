import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body: {
    email?: string;
    phoneNumber?: string;
    fullName?: string;
    country?: string;
    program?: string;
    userId?: string;
  } = await req.json();

  if (!body.userId) {
    return new Response(JSON.stringify({ error: "userId is required" }), { status: 400 });
  }

  const application = await prisma.userApplication.create({
    data: {
      userId: body.userId,
      email: body.email,
      phoneNumber: body.phoneNumber,
      fullName: body.fullName,
      country_applying_to: body.country,
      program: body.program,
    },
  });

  return new Response(JSON.stringify(application), { status: 201 });
}
