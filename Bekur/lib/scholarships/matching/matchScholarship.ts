import { Scholarship } from "../../types/scholarship";
import { StudentProfile } from "../../types/student";


export function matchScholarship(
  scholarship: Scholarship,
  student: StudentProfile
): boolean {
  if (
    scholarship.eligible_countries.length > 0 &&
    !scholarship.eligible_countries.includes(student.country_applying_to)
  ) {
    return false;
  }

  // Level
  if (
    scholarship.level.length > 0 &&
    !scholarship.level.includes(student.level)
  ) {
    return false;
  }

  // Field
  if (
    scholarship.fields_of_study.length > 0 &&
    !scholarship.fields_of_study.includes(student.field)
  ) {
    return false;
  }

  return true;
}
