// app/api/admin/send-email/route.ts
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendGmail } from "@/lib/email/sendGmail";
import { buildScholarshipEmail } from "@/lib/email/buildEmail";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
   const session = await auth.api.getSession({ headers: req.headers });
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    if (user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

  const accessToken = session.session?.token;
  if (!accessToken) {
    return Response.json(
      { error: "Admin Google account not connected" },
      { status: 401 }
    );
  }

  const { applicationId } = await req.json();

  const application = await prisma.scholarshipApplication.findUnique({
    where: { id: applicationId },
    include: {
      scholarship: true,
      userApplication: true,
      motivationLetter: true,
    },
  });

  if (!application) {
    return Response.json({ error: "Application not found" }, { status: 404 });
  }

  if (!application.scholarship.contactEmail) {
    return Response.json(
      { error: "University contact email missing" },
      { status: 400 }
    );
  }

  const letter = application.motivationLetter?.[0];
  if (!letter || !letter.approved) {
    return Response.json(
      { error: "Motivation letter not approved" },
      { status: 400 }
    );
  }

  const email = buildScholarshipEmail({
    letter: letter.content,
    student: {
      fullName: application.userApplication.fullName ?? "",
      email: application.userApplication.email ?? "",
    },
    scholarship: {
      title: application.scholarship.title,
      provider: application.scholarship.provider,
    },
  });

  try {
    const res = await sendGmail({
      accessToken,
      to: application.scholarship.contactEmail,
      cc: application.userApplication.email ?? undefined,
      subject: email.subject,
      html: email.html,
    });

    await prisma.email.create({
      data: {
        scholarshipApplicationId: application.id,
        toEmail: application.scholarship.contactEmail,
        subject: email.subject,
        body: email.html,
        gmailMessageId: res.data.id,
        status: "SENT",
        sentAt: new Date(),
      },
    });

    await prisma.scholarshipApplication.update({
      where: { id: application.id },
      data: {
        status: "SUBMITTED",
        appliedAt: new Date(),
      },
    });

    return Response.json({ success: true });
  } catch (err: any) {
    console.error("Email send failed:", err);

    if (err?.code === 401) {
      return Response.json(
        { error: "Google session expired. Reconnect Google." },
        { status: 401 }
      );
    }

    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
