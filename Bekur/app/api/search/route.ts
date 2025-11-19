import { findOpportunities } from "@/lib/langflow";
import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server';


export default async function searchOpportunities(req: NextRequest) {
  const { fullName, country, fieldOfStudy, gpa, goals } = await req.json();

  try {
    const result = await findOpportunities({
      fullName: fullName,
      country: country,
      fieldOfStudy: fieldOfStudy,
      gpa: gpa,
      goals: goals,
    });

    console.log("Search Opportunities Result:", result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Search Opportunities Error:", error);
    return NextResponse.json({ matches: [] });
  }
}
