export type BillingInterval = "monthly" | "yearly";

export interface OnboardingFormData {
  /* Step 1 — Personal Info */
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  phone: string;
  smsAlerts: boolean;
  /* Step 2 — Address */
  street: string;
  apartment: string;
  city: string;
  canton: string;
  postcode: string;
  duration: string;
  /* Step 3 — Product */
  billingInterval: BillingInterval;
  /* Step 4 — Identity */
  ahvNumber: string;
  citizenship: string;
  employmentStatus: string;
  annualIncome: string;
  sourceOfFunds: string;
  isPEP: boolean;
  /* Step 5 — Review */
  termsAccepted: boolean;
  idCheckAccepted: boolean;
  marketingAccepted: boolean;
}

export const INITIAL_FORM: OnboardingFormData = {
  firstName: "",
  lastName: "",
  dob: "",
  email: "",
  phone: "",
  smsAlerts: true,
  street: "",
  apartment: "",
  city: "",
  canton: "",
  postcode: "",
  duration: "",
  billingInterval: "monthly",
  ahvNumber: "",
  citizenship: "swiss",
  employmentStatus: "",
  annualIncome: "",
  sourceOfFunds: "",
  isPEP: false,
  termsAccepted: false,
  idCheckAccepted: false,
  marketingAccepted: false,
};

/** Total number of form steps (Welcome and Success screens excluded). */
export const TOTAL_FORM_STEPS = 5;

export const STEP_LABELS = [
  "Personal info",
  "Address",
  "Choose product",
  "Verify identity",
  "Review",
];

export type StepStatus = "done" | "active" | "pending";

export interface StepProps {
  formData: OnboardingFormData;
  update: (fields: Partial<OnboardingFormData>) => void;
  onBack: () => void;
  onNext: () => void;
}
