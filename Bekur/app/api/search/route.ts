import { findOpportunities } from "@/lib/langflow";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function searchOpportunities(req: NextRequest) {
  const {
    fullName,
    phoneNumber,
    purpose,
    passport,
    country,
    program,
    dateOfBirth,
  } = await req.json();

  try {
    if (
      !fullName ||
      !country ||
      !program ||
      !purpose ||
      !phoneNumber ||
      !passport ||
      !dateOfBirth
    ) {
      return NextResponse.json({ message: "All fields are required" });
    }

    const applications = await prisma.userApplication.findMany();
    if (applications) {
      return NextResponse.json({ message: "you can't apply again" });
    } else {
      const newApplication = await prisma.userApplication.create({
        data: {
          fullName,
          phoneNumber,
          purpose,
          passport,
          country,
          program,
          dateOfBirth,
        },
      });
    }

    console.log("Search Opportunities Result:", applications);

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Search Opportunities Error:", error);
    return NextResponse.json({ matches: [] });
  }
}
