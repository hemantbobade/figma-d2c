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
import "../onboarding3.css";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";
import { StepProgress } from "../shared/StepProgress";
import { type FormData, type ScreenProps } from "../types";

/* ── Label maps ──────────────────────────────────────── */
const DURATION_MAP: Record<string, string> = {
  lt1: "Less than 1 year",
  "1-2": "1 – 2 years",
  "3-5": "3 – 5 years",
  gt5: "More than 5 years",
};
const EMPLOYMENT_MAP: Record<string, string> = {
  employed: "Employed",
  "self-employed": "Self-employed",
  retired: "Retired",
  student: "Student",
  unemployed: "Unemployed",
};
const INCOME_MAP: Record<string, string> = {
  lt30k: "Under CHF 30,000",
  "30-60k": "CHF 30,000 – CHF 60,000",
  "60-120k": "CHF 60,000 – CHF 120,000",
  gt120k: "Over CHF 120,000",
};
const SOURCE_MAP: Record<string, string> = {
  salary: "Salary / wages",
  business: "Business income",
  savings: "Savings",
  inheritance: "Inheritance",
  investments: "Investments",
};
const CITIZENSHIP_MAP: Record<string, string> = {
  swiss: "Swiss citizen",
  "c-permit": "Swiss permanent resident (C permit)",
  other: "Other",
};

/* ── Sub-components ───────────────────────────────────── */
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="ob3-summary-row">
      <TextSmall className="ob3-summary-label">{label}</TextSmall>
      <TextStrong>{value}</TextStrong>
    </div>
  );
}

function ReviewSection({
  title,
  editStep,
  onEdit,
  children,
}: {
  title: string;
  editStep: number;
  onEdit: (n: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="ob3-review-card">
      <Flex direction="row" alignSecondary="center" gap="400">
        <TextSubheading>{title}</TextSubheading>
        <div style={{ flex: "1 0 0" }} />
        <TextLink
          href="#"
          onClick={(e) => {
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

/* ── Main component ────────────────────────────────────── */
interface ReviewConfirmProps extends ScreenProps {
  jumpTo: (n: number) => void;
  onSubmit: () => void;
}

function addressLine(d: FormData) {
  return [d.street, d.apartment].filter(Boolean).join(", ") || "—";
}
function cityLine(d: FormData) {
  return [d.city, d.canton, d.postcode].filter(Boolean).join(", ") || "—";
}

export function ReviewConfirm({
  data,
  patch,
  back,
  jumpTo,
  onSubmit,
}: ReviewConfirmProps) {
  const { isMobile } = useMediaQuery();
  const { currentPlan } = usePricing();

  const planLabel = currentPlan
    ? `${currentPlan.name} — CHF ${currentPlan.price}/${
        data.billingInterval === "monthly" ? "mo" : "yr"
      }`
    : "—";

  const canSubmit = data.termsAccepted && data.idCheckAccepted;

  return (
    <>
      <Header />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob3-mid">
          <Flex direction="column" gap="800">
            <StepProgress step={5} />

            <TextTitlePage>Review and confirm</TextTitlePage>
            <TextSubtitle>
              Confirm and we’ll open your account in minutes.
            </TextSubtitle>

            {/* Personal info card */}
            <ReviewSection
              title="Personal information"
              editStep={1}
              onEdit={jumpTo}
            >
              <SummaryRow
                label="Legal name"
                value={
                  [data.firstName, data.lastName].filter(Boolean).join(" ") ||
                  "—"
                }
              />
              <SummaryRow
                label="Date of birth"
                value={data.dateOfBirth || "—"}
              />
              <SummaryRow label="Email" value={data.email || "—"} />
              <SummaryRow label="Mobile" value={data.phone || "—"} />
            </ReviewSection>

            {/* Address card */}
            <ReviewSection title="Address" editStep={2} onEdit={jumpTo}>
              <SummaryRow label="Street" value={addressLine(data)} />
              <SummaryRow label="City / Canton / ZIP" value={cityLine(data)} />
              <SummaryRow
                label="Time at address"
                value={DURATION_MAP[data.residenceDuration] ?? "—"}
              />
            </ReviewSection>

            {/* Product card */}
            <ReviewSection title="Product" editStep={3} onEdit={jumpTo}>
              <SummaryRow label="Account type" value={planLabel} />
            </ReviewSection>

            {/* Identity card */}
            <ReviewSection title="Identity" editStep={4} onEdit={jumpTo}>
              <SummaryRow
                label="AHV number"
                value={
                  data.ahvNumber
                    ? `AHV-Nr. …-…-${data.ahvNumber.slice(-4)}`
                    : "—"
                }
              />
              <SummaryRow
                label="Citizenship"
                value={CITIZENSHIP_MAP[data.citizenship] ?? "—"}
              />
              <SummaryRow
                label="Employment"
                value={
                  [
                    EMPLOYMENT_MAP[data.employmentStatus],
                    INCOME_MAP[data.annualIncome],
                  ]
                    .filter(Boolean)
                    .join(" – ") || "—"
                }
              />
              <SummaryRow
                label="Source of funds"
                value={SOURCE_MAP[data.sourceOfFunds] ?? "—"}
              />
            </ReviewSection>

            {/* Disclosures */}
            <Flex direction="column" gap="400">
              <CheckboxField
                label="I have read and agree to the Terms and Conditions and Electronic Communications Consent."
                isSelected={data.termsAccepted}
                onChange={(v) => patch({ termsAccepted: v })}
              />
              <CheckboxField
                label="I authorise Alpen Bank to perform an identity verification check in accordance with FINMA regulations."
                isSelected={data.idCheckAccepted}
                onChange={(v) => patch({ idCheckAccepted: v })}
              />
              <CheckboxField
                label="Send me product updates and financial tips from Alpen Bank. (Optional — unsubscribe anytime.)"
                isSelected={data.marketingOptIn}
                onChange={(v) => patch({ marketingOptIn: v })}
              />
            </Flex>

            {/* Actions */}
            <Flex direction="row" alignSecondary="center">
              <Button variant="neutral" onPress={back}>
                Back
              </Button>
              <div style={{ flex: "1 0 0" }} />
              <Button
                variant="primary"
                isDisabled={!canSubmit}
                onPress={onSubmit}
              >
                Confirm and open account
              </Button>
            </Flex>
          </Flex>
        </div>
      </Section>

      <Footer />
    </>
  );
}
