import { oauth2Client, GMAIL_SCOPES } from "@/lib/google/oauth";

export async function GET() {
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GMAIL_SCOPES,
  });

  return Response.redirect(url);
}
