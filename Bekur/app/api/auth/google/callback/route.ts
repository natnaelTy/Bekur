import { oauth2Client } from "@/lib/google/oauth";
import { prisma } from "@/lib/prisma";
import { google } from "googleapis";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return new Response("No code", { status: 400 });
  }

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Get the authenticated user's email from Google
  const oauth2 = google.oauth2({ auth: oauth2Client, version: "v2" });
  const userinfo = await oauth2.userinfo.get();
  const email = userinfo.data.email;

  if (!email) {
    return new Response("Failed to retrieve Google account email", { status: 500 });
  }

  // Link tokens to an admin user
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) {
    return new Response("No admin user found to link Google account", { status: 500 });
  }

  // Save tokens for the admin's Google account
  await prisma.googleAccount.upsert({
    where: { email },
    update: {
      accessToken: tokens.access_token ?? undefined,
      refreshToken: tokens.refresh_token ?? undefined,
      expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : undefined,
      scope: (tokens.scope as string | undefined) ?? undefined,
      userId: admin.id,
    },
    create: {
      email,
      userId: admin.id,
      accessToken: tokens.access_token ?? "",
      refreshToken: tokens.refresh_token ?? "",
      expiryDate: tokens.expiry_date ? new Date(tokens.expiry_date) : new Date(Date.now() + 3600_000),
      scope: (tokens.scope as string | undefined) ?? undefined,
    },
  });

  return Response.redirect("/admin/dashboard");
}
