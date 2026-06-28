export type BillingInterval = "monthly" | "yearly";

export interface Onboarding2FormData {
  // Step 1 — Personal info
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  smsOptIn: boolean;

  // Step 2 — Address
  streetAddress: string;
  apartment: string;
  city: string;
  canton: string;
  postcode: string;
  addressDuration: string;

  // Step 3 — Product
  billingInterval: BillingInterval;

  // Step 4 — Identity
  ahvNumber: string;
  citizenship: string;
  employmentStatus: string;
  annualIncome: string;
  sourceOfFunds: string;
  isPEP: boolean;

  // Step 5 — Disclosures (Review)
  agreeTerms: boolean;
  agreeIdentityCheck: boolean;
  agreeMarketing: boolean;
}

export const INITIAL_FORM: Onboarding2FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  smsOptIn: true,
  streetAddress: "",
  apartment: "",
  city: "",
  canton: "",
  postcode: "",
  addressDuration: "",
  billingInterval: "monthly",
  ahvNumber: "",
  citizenship: "swiss",
  employmentStatus: "",
  annualIncome: "",
  sourceOfFunds: "",
  isPEP: false,
  agreeTerms: false,
  agreeIdentityCheck: false,
  agreeMarketing: false,
};

export const TOTAL_STEPS = 5;
export const STEP_LABELS = [
  "Personal info",
  "Address",
  "Choose product",
  "Verify identity",
  "Review",
];

export type StepStatus = "done" | "active" | "pending";

export interface StepProps2 {
  formData: Onboarding2FormData;
  update: (fields: Partial<Onboarding2FormData>) => void;
  onBack: () => void;
  onNext: () => void;
}
