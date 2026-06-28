import { usePricing } from "data";
import { useMediaQuery } from "hooks";
import { Flex, Section } from "layout";
import {
  Button,
  CheckboxField,
  TextLink,
  TextSmall,
  TextStrong,
  TextSubheading,
  TextSubtitle,
  TextTitlePage,
} from "primitives";
import "../onboarding2.css";
import { Ob2Footer } from "../shared/Ob2Footer";
import { Ob2Header } from "../shared/Ob2Header";
import { Ob2Stepper } from "../shared/Ob2Stepper";
import { type Onboarding2FormData, type StepProps2 } from "../types";

interface ReviewStepProps2 extends StepProps2 {
  onEditStep: (step: number) => void;
  onSubmit: () => void;
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ob2-summary-row">
      <TextSmall className="ob2-summary-label">{label}</TextSmall>
      <TextStrong>{value}</TextStrong>
    </div>
  );
}

function ReviewCard({
  title,
  editStep,
  onEdit,
  children,
}: {
  title: string;
  editStep: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="ob2-review-card">
      <Flex direction="row" alignSecondary="center" gap="400">
        <TextSubheading>{title}</TextSubheading>
        <div style={{ flex: "1 0 0" }} />
        <TextLink
          href="#"
          onPress={(e) => {
            e.preventDefault();
            onEdit(editStep);
          }}
        >
          Edit step {editStep}
        </TextLink>
      </Flex>
      {children}
    </div>
  );
}

function formatAddress(formData: Onboarding2FormData) {
  const parts = [formData.streetAddress, formData.apartment]
    .filter(Boolean)
    .join(", ");
  return parts || "—";
}

function formatCityStateZip(formData: Onboarding2FormData) {
  return [formData.city, formData.canton, formData.postcode]
    .filter(Boolean)
    .join(", ");
}

const DURATION_LABELS: Record<string, string> = {
  lt1: "Less than 1 year",
  "1-2": "1 – 2 years",
  "3-5": "3 – 5 years",
  gt5: "More than 5 years",
};

const EMPLOYMENT_LABELS: Record<string, string> = {
  employed: "Employed",
  "self-employed": "Self-employed",
  retired: "Retired",
  student: "Student",
  unemployed: "Unemployed",
};

const INCOME_LABELS: Record<string, string> = {
  lt30k: "Under CHF 30,000",
  "30-60k": "CHF 30,000 – CHF 60,000",
  "60-120k": "CHF 60,000 – CHF 120,000",
  gt120k: "Over CHF 120,000",
};

const SOURCE_LABELS: Record<string, string> = {
  salary: "Salary / wages",
  business: "Business income",
  savings: "Savings",
  inheritance: "Inheritance",
  investments: "Investments",
};

const CITIZENSHIP_LABELS: Record<string, string> = {
  swiss: "Swiss citizen",
  "c-permit": "Swiss permanent resident (C permit)",
  other: "Other",
};

export function ReviewStep({
  formData,
  update,
  onBack,
  onEditStep,
  onSubmit,
}: ReviewStepProps2) {
  const { isMobile } = useMediaQuery();
  const { currentPlan } = usePricing();

  const planName = currentPlan
    ? `${currentPlan.name} (CHF ${currentPlan.price}/${formData.billingInterval === "monthly" ? "mo" : "yr"})`
    : "—";

  return (
    <>
      <Ob2Header />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob2-inner-review" style={{ margin: "0 auto" }}>
          <Flex direction="column" gap="800">
            <Ob2Stepper currentStep={5} />

            <TextTitlePage>Review and confirm</TextTitlePage>
            <TextSubtitle>
              Confirm and we'll open your account in minutes.
            </TextSubtitle>

            {/* Personal info */}
            <ReviewCard
              title="Personal information"
              editStep={1}
              onEdit={onEditStep}
            >
              <SummaryRow
                label="Legal name"
                value={
                  [formData.firstName, formData.lastName]
                    .filter(Boolean)
                    .join(" ") || "—"
                }
              />
              <SummaryRow
                label="Date of birth"
                value={formData.dateOfBirth || "—"}
              />
              <SummaryRow label="Email" value={formData.email || "—"} />
              <SummaryRow label="Mobile" value={formData.phone || "—"} />
            </ReviewCard>

            {/* Address */}
            <ReviewCard title="Address" editStep={2} onEdit={onEditStep}>
              <SummaryRow label="Street" value={formatAddress(formData)} />
              <SummaryRow
                label="City / State / ZIP"
                value={formatCityStateZip(formData) || "—"}
              />
              <SummaryRow
                label="Years at address"
                value={DURATION_LABELS[formData.addressDuration] ?? "—"}
              />
            </ReviewCard>

            {/* Product */}
            <ReviewCard title="Product" editStep={3} onEdit={onEditStep}>
              <SummaryRow label="Account type" value={planName} />
            </ReviewCard>

            {/* Identity */}
            <ReviewCard title="Identity" editStep={4} onEdit={onEditStep}>
              <SummaryRow
                label="SSN"
                value={
                  formData.ahvNumber
                    ? `AHV-Nr. …-…-${formData.ahvNumber.slice(-4)}`
                    : "—"
                }
              />
              <SummaryRow
                label="Citizenship"
                value={CITIZENSHIP_LABELS[formData.citizenship] ?? "—"}
              />
              <SummaryRow
                label="Employment"
                value={
                  [
                    EMPLOYMENT_LABELS[formData.employmentStatus],
                    INCOME_LABELS[formData.annualIncome],
                  ]
                    .filter(Boolean)
                    .join(" – ") || "—"
                }
              />
              <SummaryRow
                label="Source of funds"
                value={SOURCE_LABELS[formData.sourceOfFunds] ?? "—"}
              />
            </ReviewCard>

            {/* Disclosures */}
            <Flex direction="column" gap="400">
              <CheckboxField
                label="I have read and agree to the Terms and Conditions and Electronic Communications Consent."
                isSelected={formData.agreeTerms}
                onChange={(v) => update({ agreeTerms: v })}
              />
              <CheckboxField
                label="I authorise Alpen Bank to perform an identity verification check in accordance with FINMA regulations."
                isSelected={formData.agreeIdentityCheck}
                onChange={(v) => update({ agreeIdentityCheck: v })}
              />
              <CheckboxField
                label="Send me product updates and financial tips from Alpen Bank. (Optional - unsubscribe anytime.)"
                isSelected={formData.agreeMarketing}
                onChange={(v) => update({ agreeMarketing: v })}
              />
            </Flex>

            {/* Form actions */}
            <Flex direction="row" alignSecondary="center">
              <Button variant="neutral" onPress={onBack}>
                Back
              </Button>
              <div style={{ flex: "1 0 0" }} />
              <Button
                variant="primary"
                isDisabled={!formData.agreeTerms || !formData.agreeIdentityCheck}
                onPress={onSubmit}
              >
                Confirm and open account
              </Button>
            </Flex>
          </Flex>
        </div>
      </Section>

      <Ob2Footer />
    </>
  );
}
