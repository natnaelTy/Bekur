export type Scholarship = {
  id?: string;

  title: string;
  provider: string;

  country: string;
  eligible_countries: string[];

  level: ("bachelor" | "master" | "phd")[];
  fields_of_study: string[];

  benefits: string[];
  required_documents: string[];

  deadline: string | null;
  application_url: string | null;

  description: string;
};
