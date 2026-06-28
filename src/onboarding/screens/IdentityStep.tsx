import { useMediaQuery } from "hooks";
import { IconLock } from "icons";
import { Flex, FlexItem, Section } from "layout";
import {
  Button,
  CheckboxField,
  InputField,
  RadioField,
  RadioGroup,
  SelectField,
  SelectItem,
  TextSmall,
  TextStrong,
  TextSubtitle,
  TextTitlePage,
} from "primitives";
import { OnboardingFooter } from "../shared/OnboardingFooter";
import { OnboardingHeader } from "../shared/OnboardingHeader";
import { Stepper } from "../shared/Stepper";
import { type StepProps } from "../types";

export function IdentityStep({ formData, update, onBack, onNext }: StepProps) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <OnboardingHeader />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob-inner">
          <Flex direction="column" gap="800">
            <Stepper currentStep={4} />

            <TextTitlePage>Confirm a few last details</TextTitlePage>
            <TextSubtitle>Required by Swiss law. Your data is safe.</TextSubtitle>

            {/* Security notice */}
            <div className="ob-notice-secure">
              <Flex direction="row" gap="400" alignSecondary="start">
                <IconLock size="20" className="ob-notice-icon" aria-hidden="true" />
                <Flex direction="column" gap="100">
                  <TextStrong>Your data is encrypted end-to-end</TextStrong>
                  <TextSmall>
                    We follow ISO 27001 security standards. Read more in our
                    Privacy Notice.
                  </TextSmall>
                </Flex>
              </Flex>
            </div>

            {/* AHV Number — constrained width to match compact form pattern */}
            <FlexItem size="half">
              <InputField
                label="AHV Number (Social Security)"
                placeholder="756.1234.5678.97"
                description="Required to confirm your identity under Swiss AML regulations."
                isRequired
                value={formData.ahvNumber}
                onChange={(v) => update({ ahvNumber: v })}
              />
            </FlexItem>

            {/* Citizenship */}
            <RadioGroup
              value={formData.citizenship}
              onChange={(v) => update({ citizenship: v })}
              aria-label="Citizenship status"
            >
              <RadioField value="swiss" label="Swiss citizen" />
              <RadioField
                value="c-permit"
                label="Swiss permanent resident (C permit)"
              />
              <RadioField value="other" label="Other" />
            </RadioGroup>

            {/* Employment row */}
            <Flex direction={isMobile ? "column" : "row"} gap="400">
              <FlexItem size={isMobile ? "full" : "half"}>
                <SelectField
                  label="Employment status"
                  selectedKey={formData.employmentStatus || undefined}
                  onSelectionChange={(k) =>
                    update({ employmentStatus: String(k) })
                  }
                  placeholder="Select..."
                >
                  <SelectItem id="employed">Employed</SelectItem>
                  <SelectItem id="self-employed">Self-employed</SelectItem>
                  <SelectItem id="retired">Retired</SelectItem>
                  <SelectItem id="student">Student</SelectItem>
                  <SelectItem id="unemployed">Unemployed</SelectItem>
                </SelectField>
              </FlexItem>
              <FlexItem size={isMobile ? "full" : "half"}>
                <SelectField
                  label="Annual income (gross)"
                  selectedKey={formData.annualIncome || undefined}
                  onSelectionChange={(k) =>
                    update({ annualIncome: String(k) })
                  }
                  placeholder="Select..."
                >
                  <SelectItem id="lt30k">Under CHF 30,000</SelectItem>
                  <SelectItem id="30-60k">CHF 30,000 – CHF 60,000</SelectItem>
                  <SelectItem id="60-120k">CHF 60,000 – CHF 120,000</SelectItem>
                  <SelectItem id="gt120k">Over CHF 120,000</SelectItem>
                </SelectField>
              </FlexItem>
            </Flex>

            <SelectField
              label="Primary source of funds"
              selectedKey={formData.sourceOfFunds || undefined}
              onSelectionChange={(k) => update({ sourceOfFunds: String(k) })}
              placeholder="Select..."
            >
              <SelectItem id="salary">Salary / wages</SelectItem>
              <SelectItem id="business">Business income</SelectItem>
              <SelectItem id="savings">Savings</SelectItem>
              <SelectItem id="inheritance">Inheritance</SelectItem>
              <SelectItem id="investments">Investments</SelectItem>
            </SelectField>

            <CheckboxField
              label="I am, or am related to, a politically exposed person (PEP)."
              description="If you check this, an underwriter will contact you within 1 business day."
              isSelected={formData.isPEP}
              onChange={(v) => update({ isPEP: v })}
            />

            <TextSmall>
              In accordance with the Swiss Anti-Money Laundering Act (AMLA),
              Alpen Bank is required to verify the identity of all customers
              before opening an account.
            </TextSmall>

            {/* Form actions */}
            <Flex direction="row" alignSecondary="center" className="ob-action-row">
              <Button variant="neutral" onPress={onBack}>
                Back
              </Button>
              <div style={{ flex: '1 0 0' }} />
              <Button variant="primary" onPress={onNext}>
                Continue
              </Button>
            </Flex>
          </Flex>
        </div>
      </Section>

      <OnboardingFooter />
    </>
  );
}
