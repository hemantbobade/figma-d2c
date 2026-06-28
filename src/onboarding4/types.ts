export type BillingInterval = "monthly" | "yearly";
export type StepStatus = "done" | "active" | "pending";

export interface FormData {
  /* ─── Step 1: Personal information ─── */
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  smsOptIn: boolean;

  /* ─── Step 2: Address ─── */
  street: string;
  apartment: string;
  city: string;
  canton: string;
  postcode: string;
  residenceDuration: string;

  /* ─── Step 3: Product selection ─── */
  billingInterval: BillingInterval;

  /* ─── Step 4: Identity verification ─── */
  ahvNumber: string;
  citizenship: string;
  employmentStatus: string;
  annualIncome: string;
  sourceOfFunds: string;
  isPEP: boolean;

  /* ─── Step 5: Disclosures ─── */
  termsAccepted: boolean;
  idCheckAccepted: boolean;
  marketingOptIn: boolean;
}

export const EMPTY_FORM: FormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  phone: "",
  smsOptIn: true,
  street: "",
  apartment: "",
  city: "",
  canton: "",
  postcode: "",
  residenceDuration: "",
  billingInterval: "monthly",
  ahvNumber: "",
  citizenship: "swiss",
  employmentStatus: "",
  annualIncome: "",
  sourceOfFunds: "",
  isPEP: false,
  termsAccepted: false,
  idCheckAccepted: false,
  marketingOptIn: false,
};

export const STEP_COUNT = 5;
export const STEP_NAMES = [
  "Personal info",
  "Address",
  "Choose product",
  "Verify identity",
  "Review",
] as const;

export interface ScreenProps {
  data: FormData;
  patch: (fields: Partial<FormData>) => void;
  back: () => void;
  next: () => void;
}
