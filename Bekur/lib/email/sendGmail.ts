import { google } from "googleapis";

type SendEmailInput = {
  accessToken: string;
  to: string;
  subject: string;
  html: string;
  cc?: string;
};

export async function sendGmail({
  accessToken,
  to,
  subject,
  html,
  cc,
}: SendEmailInput) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth });

  const headers = [
    `To: ${to}`,
    cc ? `Cc: ${cc}` : null,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
  ]
    .filter(Boolean)
    .join("\r\n");

  const rawMessage = Buffer.from(
    `${headers}\r\n\r\n${html}`
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: rawMessage },
  });
}