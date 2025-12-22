import { matchScholarship } from "./matchScholarship";
import { rankScholarships } from "./rankScholarships";

export function recommendScholarships(
  scholarships: any[],
  student: any
) {
  const matched = scholarships.filter((s) =>
    matchScholarship(s, student)
  );

  return rankScholarships(matched, student);
}
