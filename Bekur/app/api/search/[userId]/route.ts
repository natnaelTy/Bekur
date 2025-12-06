export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

import { findOpportunities } from "@/lib/langflow";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface ApplicationData {
  fullName: string;
  phoneNumber: string;
  purpose: string;
  passport: string;
  country: string;
  dateOfBirth: string;
  email: string;
}

const prisma = new PrismaClient();

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } }
): Promise<NextResponse> {

  const { userId } = params;
  
  const {
    fullName,
    phoneNumber,
    purpose,
    passport,
    country,
    dateOfBirth,
    email,
    program,
    notes,
    university,
  } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId in route" },
      { status: 400 }
    );
  }

  try {
    if (
      !fullName ||
      !country ||
      !purpose ||
      !phoneNumber ||
      !passport ||
      !dateOfBirth ||
      !email
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Ensure the referenced User exists before attempting nested connect
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      console.error("User not found for id:", userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const app = await prisma.userApplication.create({
      data: {
        user: { connect: { id: userId } },
        university: university ?? "Addis Ababa University",
        fullName,
        phoneNumber,
        email,
        dateOfBirth: new Date(dateOfBirth),
        country,
        purpose,
        passport,
        program,
        notes,
      },
    });

    console.log("Search Opportunities Result:", app);

    return NextResponse.json(app, { status: 201 });
  } catch (error) {
    console.error("Search Opportunities Error:", error);
    return NextResponse.json({ matches: [] }, { status: 500 });
  }
}
