import type { ReactNode } from "react";
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
import { OnboardingFooter } from "../shared/OnboardingFooter";
import { OnboardingHeader } from "../shared/OnboardingHeader";
import { Stepper } from "../shared/Stepper";
import { type StepProps } from "../types";

/* ── Internal helpers ─────────────────────────────────────────────────────── */

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ob-summary-row">
      <TextSmall className="ob-summary-label">{label}</TextSmall>
      <TextStrong className="ob-summary-value">{value}</TextStrong>
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
  children: ReactNode;
}) {
  return (
    <div className="ob-review-card">
      <div className="ob-review-card-header">
        <TextSubheading>{title}</TextSubheading>
        <div style={{ flex: '1 0 0' }} />
        <TextLink href="#" onClick={() => onEdit(editStep)}>
          Edit step {editStep}
        </TextLink>
      </div>
      {children}
    </div>
  );
}

/* ── Exported types ───────────────────────────────────────────────────────── */

export interface ReviewStepProps extends StepProps {
  onEditStep: (step: number) => void;
  onSubmit: () => void;
  selectedPlanName: string;
  selectedPlanPrice: string;
  selectedAddOns: string;
}

/* ── Screen ───────────────────────────────────────────────────────────────── */

export function ReviewStep({
  formData,
  update,
  onBack,
  onEditStep,
  onSubmit,
}: ReviewStepProps) {
  const { isMobile } = useMediaQuery();
  const { currentPlan } = usePricing();

  const canSubmit = formData.termsAccepted && formData.idCheckAccepted;

  /* ── Label lookup maps (keys stored in formData → human-readable labels) ── */
  const durationLabels: Record<string, string> = {
    lt1: "Less than 1 year",
    "1-2": "1 – 2 years",
    "3-5": "3 – 5 years",
    gt5: "More than 5 years",
  };
  const employmentLabels: Record<string, string> = {
    employed: "Employed",
    "self-employed": "Self-employed",
    retired: "Retired",
    student: "Student",
    unemployed: "Unemployed",
  };
  const incomeLabels: Record<string, string> = {
    lt30k: "Under CHF 30,000",
    "30-60k": "CHF 30,000 – CHF 60,000",
    "60-120k": "CHF 60,000 – CHF 120,000",
    gt120k: "Over CHF 120,000",
  };
  const sourceLabels: Record<string, string> = {
    salary: "Salary / wages",
    business: "Business income",
    savings: "Savings",
    inheritance: "Inheritance",
    investments: "Investments",
  };
  const citizenshipLabel: Record<string, string> = {
    swiss: "Swiss citizen",
    "c-permit": "Swiss permanent resident (C permit)",
    other: "Other",
  };

  /* ── Derived display values ─────────────────────────────────────────────── */
  const fullName =
    [formData.firstName, formData.lastName].filter(Boolean).join(" ") || "—";
  const addressLine =
    [formData.street, formData.apartment].filter(Boolean).join(", ") || "—";
  const cityLine =
    [
      formData.city,
      formData.canton ? formData.canton.toUpperCase() : "",
      formData.postcode,
    ]
      .filter(Boolean)
      .join(", ") || "—";
  const durationLabel =
    durationLabels[formData.duration] || formData.duration || "—";
  const planName = currentPlan
    ? `${currentPlan.name} (${currentPlan.currency}\u00a0${currentPlan.price}/${currentPlan.interval === "month" ? "mo" : "yr"})`
    : "Alpen Advantage (CHF\u00a010/mo)";
  const employmentStr =
    employmentLabels[formData.employmentStatus] || formData.employmentStatus || "";
  const incomeStr =
    incomeLabels[formData.annualIncome] || formData.annualIncome || "";
  const employmentLine =
    [employmentStr, incomeStr].filter(Boolean).join(" – ") || "—";
  const sourceLabel =
    sourceLabels[formData.sourceOfFunds] || formData.sourceOfFunds || "—";

  return (
    <>
      <OnboardingHeader />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob-inner-wide">
          <Flex direction="column" gap="800">
            <Stepper currentStep={5} />

            <TextTitlePage>Review and confirm</TextTitlePage>
            <TextSubtitle>
              Confirm and we'll open your account in minutes.
            </TextSubtitle>

            <ReviewCard
              title="Personal information"
              editStep={1}
              onEdit={onEditStep}
            >
              <SummaryRow label="Legal name" value={fullName} />
              <SummaryRow label="Date of birth" value={formData.dob || "—"} />
              <SummaryRow label="Email" value={formData.email || "—"} />
              <SummaryRow label="Mobile" value={formData.phone || "—"} />
            </ReviewCard>

            <ReviewCard title="Address" editStep={2} onEdit={onEditStep}>
              <SummaryRow label="Street" value={addressLine} />
              <SummaryRow label="City / Canton / ZIP" value={cityLine} />
              <SummaryRow label="Years at address" value={durationLabel} />
            </ReviewCard>

            <ReviewCard title="Product" editStep={3} onEdit={onEditStep}>
              <SummaryRow label="Account type" value={planName} />
              <SummaryRow label="Add-ons" value="None selected" />
            </ReviewCard>

            <ReviewCard title="Identity" editStep={4} onEdit={onEditStep}>
              <SummaryRow
                label="AHV Number"
                value={
                  formData.ahvNumber ? `AHV-Nr. ${formData.ahvNumber}` : "—"
                }
              />
              <SummaryRow
                label="Citizenship"
                value={
                  citizenshipLabel[formData.citizenship] ||
                  formData.citizenship ||
                  "—"
                }
              />
              <SummaryRow label="Employment" value={employmentLine} />
              <SummaryRow label="Source of funds" value={sourceLabel} />
            </ReviewCard>

            {/* Disclosures */}
            <Flex direction="column" gap="400">
              <CheckboxField
                label="I have read and agree to the Terms and Conditions and Electronic Communications Consent."
                isSelected={formData.termsAccepted}
                onChange={(v) => update({ termsAccepted: v })}
              />
              <CheckboxField
                label="I authorise Alpen Bank to perform an identity verification check in accordance with FINMA regulations."
                isSelected={formData.idCheckAccepted}
                onChange={(v) => update({ idCheckAccepted: v })}
              />
              <CheckboxField
                label="Send me product updates and financial tips from Alpen Bank. (Optional - unsubscribe anytime.)"
                isSelected={formData.marketingAccepted}
                onChange={(v) => update({ marketingAccepted: v })}
              />
            </Flex>

            {/* Form actions */}
            <Flex direction="row" alignSecondary="center" className="ob-action-row">
              <Button variant="neutral" onPress={onBack}>
                Back
              </Button>
              <div style={{ flex: '1 0 0' }} />
              <Button
                variant="primary"
                onPress={onSubmit}
                isDisabled={!canSubmit}
              >
                Confirm and open account
              </Button>
            </Flex>
          </Flex>
        </div>
      </Section>

      <OnboardingFooter />
    </>
  );
}
