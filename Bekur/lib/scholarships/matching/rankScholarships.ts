import { Scholarship } from "../../types/scholarship";
import { StudentProfile } from "../../types/student";

export function rankScholarships(
  scholarships: Scholarship[],
  student: StudentProfile
) {
  return scholarships
    .map((s) => {
      let score = 0;

      if (s.country === student.country_applying_to) score += 5;
      if (s.eligible_countries.includes(student.country_applying_to)) score += 3;

      if (s.level.includes(student.level)) score += 4;
      if (s.fields_of_study.includes(student.field.toLowerCase())) score += 4;

      if (s.benefits.some((b) => b.toLowerCase().includes("full")))
        score += 2;

      return { ...s, score };
    })
    .sort((a, b) => b.score - a.score);
}
