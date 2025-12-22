

export function normalizeScholarship(raw: any) {
  return {
   title: raw.title?.trim() ?? null,
    provider: raw.provider ?? null,
    country: raw.country ?? null,
    eligible_countries: raw.eligible_countries ?? [],
    level: raw.level ?? [],
    fields_of_study: raw.fields_of_study ?? [],
    benefits: raw.benefits ?? [],
    deadline: raw.deadline ?? null,
    application_url: raw.application_url ?? null,
    required_documents: raw.required_documents ?? [],
    description: raw.description ?? null,
  };
}

function normalizeDeadline(deadline: string | null) {
  if (!deadline) return null;

  if (deadline.toLowerCase().includes("rolling")) {
    return "ROLLING";
  }

  return deadline;
}
