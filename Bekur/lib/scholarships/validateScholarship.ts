import { Scholarship } from "../types/scholarship";

export function validateScholarship(s: Scholarship) {
  if (!s.title || !s.provider) return false;
  if (!s.description) return false;
  if (!s.application_url) return false;

  return true;
}
