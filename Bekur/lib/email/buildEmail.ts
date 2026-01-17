export function buildScholarshipEmail(
  letter: string,
  scholarship: any,
  student: any
) {
  return {
    subject: `Scholarship Application – ${student?.fullName ?? "Applicant"}`,
    body: `
Dear Admissions Committee,

${letter}

Kind regards,
${student?.fullName ?? ""}
Email: ${student?.email ?? ""}
`,
  };
}
