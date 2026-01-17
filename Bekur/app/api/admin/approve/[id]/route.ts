import { prisma } from "@/lib/prisma";
import { sendGmail } from "@/lib/email/sendGmail";
import { buildScholarshipEmail } from "@/lib/email/buildEmail";


export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { content, approved } = await req.json();

  const app = await prisma.scholarshipApplication.findUnique({
    where: { id },
    include: {
      motivationLetter: true,
      scholarship: true,
      userApplication: true,
    },
  });

  if (!app) {
    return Response.json(
      { error: "Application not found" },
      { status: 404 }
    );
  }

  const letter = app.motivationLetter?.[0];

  if (!letter) {
    return Response.json(
      { error: "Motivation letter not found for application" },
      { status: 404 }
    );
  }

  const updated = await prisma.motivationLetter.update({
    where: { id: letter.id },
    data: {
      content,
      approved,
      approvedAt: approved ? new Date() : null,
    },
  });

  await prisma.scholarshipApplication.update({
    where: { id },
    data: {
      status: approved ? "APPROVED" : "IN_PROGRESS",
    },
  });

  // If approved, send the motivation letter email to the university
  if (approved) {
    const google = await prisma.googleAccount.findFirst();
    if (!google) {
      return Response.json(
        { error: "Google account not configured for sending email" },
        { status: 500 }
      );
    }

    const letterContent = content ?? letter.content;
    const emailPayload = buildScholarshipEmail(
      letterContent,
      app.scholarship,
      app.userApplication
    );

    // Prefer scholarship application_url if it looks like an email; otherwise fallback to applicant email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const to = emailRegex.test(app.scholarship.application_url ?? "")
      ? app.scholarship.application_url!
      : app.userApplication?.email ?? "";

    if (!to) {
      return Response.json(
        { error: "No destination email found for university/applicant" },
        { status: 400 }
      );
    }

    const sendRes = await sendGmail({
      accessToken: google.accessToken,
      refreshToken: google.refreshToken,
      to,
      subject: emailPayload.subject,
      body: emailPayload.body,
    });

    await prisma.email.create({
      data: {
        scholarshipApplicationId: id,
        toEmail: to,
        subject: emailPayload.subject,
        body: emailPayload.body,
        gmailMessageId: sendRes?.data?.id,
        status: "SENT",
        sentAt: new Date(),
      },
    });
  }

  return Response.json(updated);
}
