import { Scholarship } from "../../types/scholarship";
import { StudentProfile } from "../../types/student";

export function scoreScholarship(
  scholarship: Scholarship,
  student: StudentProfile
): number {
  let score = 0;
  let maxScore = 100;

  if (scholarship.country === student.country_applying_to) {
    score += 40;
  }


  if (scholarship.level.includes(student.level)) {
    score += 20;
  }


  if (
    scholarship.fields_of_study.length === 0 ||
    scholarship.fields_of_study.includes(student.field)
  ) {
    score += 20;
  }

  if (student.hasPassport) {
    score += 10;
  }


  if (scholarship.deadline) {
    score += 10;
  }

  return Math.min(score, maxScore); 
}
