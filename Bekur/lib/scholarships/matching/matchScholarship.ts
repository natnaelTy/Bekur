import { Scholarship } from "../../types/scholarship";
import { StudentProfile } from "../../types/student";

export function matchScholarship(
  scholarship: Scholarship,
  student: StudentProfile
): boolean {

  if (
    scholarship.country &&
    scholarship.country !== student.country_applying_to
  ) {
    return false;
  }

  if (
    scholarship.level.length > 0 &&
    !scholarship.level.includes(student.level)
  ) {
    return false;
  }

  if (
    scholarship.fields_of_study.length > 0 &&
    !scholarship.fields_of_study.includes(student.field)
  ) {
    return false;
  }

  return true;
}
