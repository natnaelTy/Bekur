import { Scholarship } from "../../types/scholarship";
import { StudentProfile } from "../../types/student";
import { matchScholarship } from "./matchScholarship";
import { scoreScholarship } from "./scoreScholarship";

export function recommendScholarships(
  scholarships: Scholarship[],
  student: StudentProfile
) {
  const matched = scholarships
    .filter((s) => matchScholarship(s, student))
    .map((s) => ({
      ...s,
      score: scoreScholarship(s, student),
    }))
    .sort((a, b) => b.score - a.score);

    console.log("Matched Scholarships:", matched);
  if (matched.length === 0) {
    return {
      message: "No scholarship found in your desired country",
      data: [],
    };
  }

  return {
    message: "Recommended scholarships based on your profile",
    data: matched,
  };
}
