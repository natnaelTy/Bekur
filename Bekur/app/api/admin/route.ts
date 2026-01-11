
import { authClient } from "@/lib/auth-client";
import { NextResponse } from "next/server";

export async function GET() {
  const { data: session, isPending, error } = authClient.useSession();

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ message: "Admin access granted" });
}
