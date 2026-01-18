import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newPassword = body?.newPassword as string | undefined;
    if (!newPassword || typeof newPassword !== "string") {
      return NextResponse.json(
        { error: "newPassword is required" },
        { status: 400 }
      );
    }

    const { data, error }: any = await auth.api.setPassword({
      body: { newPassword },
      headers: req.headers,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: error.status || 400 });
    }

    return NextResponse.json(data ?? { status: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Failed to set password" },
      { status: 500 }
    );
  }
}
