import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { application } from "@/lib/scholarships/applications/application";



type ApplyBody = {
  fullName?: string;
  email?: string;
  phone?: string;
  country?: string;
  dateOfBirth?: string;
  hasPassport?: "yes" | "no";
  scholarshipId?: string;
  userId?: string;
};

export async function POST(req: Request) {
  try {
    const body: ApplyBody = await req.json();

    if (!body.userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }
    if (!body.scholarshipId) {
      return NextResponse.json({ error: "scholarshipId is required" }, { status: 400 });
    }

    const priorApplication = await prisma.userApplication.findFirst({
      where: { userId: body.userId },
      select: { id: true },
    });

    if (priorApplication) {
      return NextResponse.json(
        { error: "You have already submitted an application." },
        { status: 409 }
      );
    }

    const hasPassportBool = body.hasPassport === "yes";
    const dob = body.dateOfBirth ? new Date(body.dateOfBirth) : undefined;

    const userApplication = await prisma.userApplication.create({
      data: {
        userId: body.userId,
        fullName: body.fullName,
        email: body.email,
        phoneNumber: body.phone,
        country_applying_to: body.country,
        dateOfBirth: dob,
        hasPassport: hasPassportBool,
      },
    });

    // Link the application to the selected scholarship, avoiding duplicates
    const scholarshipApplication = await prisma.scholarshipApplication.upsert({
      where: {
        userApplicationId_scholarshipId: {
          userApplicationId: userApplication.id,
          scholarshipId: body.scholarshipId,
        },
      },
      update: {},
      create: {
        userApplicationId: userApplication.id,
        scholarshipId: body.scholarshipId,
        status: "SUBMITTED",
        appliedAt: new Date(),
      },
    });

    console.log("Scholarship Application:", scholarshipApplication.userApplicationId);

    await application({ id: scholarshipApplication.userApplicationId });

    return NextResponse.json(
      { application: userApplication, scholarshipApplication },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const allApplications = await prisma.userApplication.findMany({
      include: {
        user: {
          select: { email: true } 
        },
        scholarshipApplications: {
          include: {
            scholarship: {
              select: { title: true, } 
            },
            motivationLetter: {
              select: { approved: true, content: true } 
            }
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json({allApplications}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admin data" }, { status: 500 });
  }
}