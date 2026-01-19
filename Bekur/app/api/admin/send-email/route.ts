import { prisma } from "@/lib/prisma";
import { sendGmail } from "@/lib/email/sendGmail";
import { buildScholarshipEmail } from "@/lib/email/buildEmail";

export async function POST(req: Request) {
  const { applicationId } = await req.json();

  const app = await prisma.scholarshipApplication.findUnique({
    where: { id: applicationId },
    include: {
      userApplication: true,
      scholarship: true,
      motivationLetter: true,
    },
  });

  if (!app) {
    return new Response(JSON.stringify({ error: "Application not found" }), { status: 404 });
  }

  const account = await prisma.account.findFirst();

  if (!account) {
    return new Response(JSON.stringify({ error: "Google account not configured" }), { status: 500 });
  }

  const accessToken =
    (account as any).access_token ??
    (account as any).accessToken ??
    (account as any).accessToken;

  if (!accessToken) {
    return new Response(JSON.stringify({ error: "Google account access token is missing" }), { status: 500 });
  }

  const latestLetter = Array.isArray(app.motivationLetter) && app.motivationLetter.length > 0
    ? app.motivationLetter[0]
    : null;
  if (!latestLetter) {
    return new Response(JSON.stringify({ error: "Motivation letter not found" }), { status: 400 });
  }

  const email = buildScholarshipEmail(
    latestLetter.content,
    app.scholarship,
    app.userApplication
  );

  if (!app.userApplication?.email) {
    return new Response(JSON.stringify({ error: "Applicant email not found" }), { status: 400 });
  }

  try {
    const res = await sendGmail({
      accessToken: accessToken,
      to: app.userApplication.email,
      subject: email.subject,
      body: email.body,
    });

    await prisma.email.create({
      data: {
        scholarshipApplicationId: applicationId,
        toEmail: app.userApplication?.email ?? "",
        subject: email.subject,
        body: email.body,
        gmailMessageId: res?.data?.id,
        status: "SENT",
        sentAt: new Date(),
      },
    });
  } catch (err: any) {
    console.error("Failed to send admin email", err);
    const status = err?.code ?? err?.response?.status;
    if (status === 401) {
      return new Response(JSON.stringify({ error: "Google access token invalid or expired. Re-connect Google and try again." }), { status: 401 });
    }
    if (status === 403) {
      return new Response(JSON.stringify({ error: "Google access token is missing the gmail.send scope. Re-connect Google with email permissions." }), { status: 403 });
    }
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }

  await prisma.scholarshipApplication.update({
    where: { id: applicationId },
    data: { status: "SUBMITTED" },
  });

  const pendingEmails = await prisma.email.findMany({
    where: {
      status: "SENT",
      sentAt: { lt: new Date(Date.now() - 7 * 86400000) },
    },
  });

  return Response.json({ success: true });
}
