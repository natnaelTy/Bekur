import { google } from "googleapis";

export async function sendGmail({
  accessToken,
  refreshToken,
  to,
  subject,
  body,
}: any) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const gmail = google.gmail({ version: "v1", auth });

  const message = `
To: "natitaye315@gmail.com"
Subject: ${subject}
Content-Type: text/plain; charset=utf-8

${body}
`;

  const encoded = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encoded },
  });
}
