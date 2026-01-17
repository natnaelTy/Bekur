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

  const google = await prisma.googleAccount.findFirst();
  if (!google) {
    return new Response(JSON.stringify({ error: "Google account not configured" }), { status: 500 });
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

  const res = await sendGmail({
    accessToken: google.accessToken,
    refreshToken: google.refreshToken,
    to: app.userApplication?.email,
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
