export type StudentProfile = {
  fullName: string;
  email: string;
  country_applying_to: string;
  level: "bachelor" | "master" | "phd";
  field: string;
  hasPassport: boolean;
};
