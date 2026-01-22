export type PartnerApplicationPayload = {
  student: {
    fullName: string;
    email: string;
    phone: string;
    country: string;
    dateOfBirth: string;
  };
  scholarship: {
    id: string;
    title: string;
    level: string[];
    field: string[];
    country?: string;
  };
  documents: {
    passport?: string;
    transcript?: string;
    motivationLetter?: string;
  };
};

export type PartnerSubmitResult = {
  success: boolean;
  externalApplicationId?: string;
  message?: string;
};

export interface PartnerAdapter {
  submitApplication(
    payload: PartnerApplicationPayload
  ): Promise<PartnerSubmitResult>;
}
