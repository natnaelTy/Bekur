export function motivationLetterPrompt({
  student,
  scholarship,
}: {
  student: {
    fullName: string;
    country: string;
    field: string;
    level: string;
    goals: string;
  };
  scholarship: {
    title: string;
    provider: string;
    country: string;
    values?: string[];
  };
}) {
  return `
You are an academic writing assistant.

Rules:
- DO NOT invent achievements
- DO NOT fabricate experience
- Use only provided information
- Write formally and honestly
- Output a DRAFT motivation letter

Student Information:
Name: ${student.fullName}
Country: ${student.country}
Field of Study: ${student.field}
Level: ${student.level}
Goals: ${student.goals}

Scholarship:
Name: ${scholarship.title}
Provider: ${scholarship.provider}
Country: ${scholarship.country}
Values: ${scholarship.values?.join(", ") || "N/A"}

Write a clear, professional motivation letter (max 700 words).
`;
}
