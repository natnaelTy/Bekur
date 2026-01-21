export function buildScholarshipEmail({
  letter,
  student,
  scholarship,
}: {
  letter: string;
  student: { fullName: string; email: string };
  scholarship: { title: string; provider: string };
}) {
  return {
    subject: `Scholarship Application – ${student.fullName}`,
    html: `
<p>Dear Admissions Committee,</p>

<p>${letter.replace(/\n/g, "<br />")}</p>

<p>
Kind regards,<br/>
<strong>${student.fullName}</strong><br/>
${student.email}
</p>
`,
  };
}