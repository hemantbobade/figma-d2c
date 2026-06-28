import { useMediaQuery } from "hooks";
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
import "../onboarding4.css";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";
import { StepProgress } from "../shared/StepProgress";
import { type ScreenProps } from "../types";

export function IdentityCheck({ data, patch, back, next }: ScreenProps) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <Header />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob4-narrow">
          <Flex direction="column" gap="800">
            <StepProgress step={4} />

            <TextTitlePage>Confirm a few last details</TextTitlePage>
            <TextSubtitle>Required by Swiss law. Your data is safe.</TextSubtitle>

            {/* Security notice */}
            <div className="ob4-notice-neutral">
              <Flex direction="column" gap="100">
                <TextStrong>Your data is encrypted end-to-end</TextStrong>
                <TextSmall>
                  We follow ISO 27001 security standards. Read more in our
                  Privacy Notice.
                </TextSmall>
              </Flex>
            </div>

            {/* AHV number */}
            <Flex direction="row" gap="400">
              <FlexItem size="half">
                <InputField
                  label="AHV Number (Social Security)"
                  placeholder="756.1234.5678.97"
                  description="Required to confirm your identity under Swiss AML regulations."
                  isRequired
                  value={data.ahvNumber}
                  onChange={(v) => patch({ ahvNumber: v })}
                />
              </FlexItem>
            </Flex>

            {/* Citizenship */}
            <RadioGroup
              value={data.citizenship}
              onChange={(v) => patch({ citizenship: v })}
              aria-label="Citizenship status"
            >
              <RadioField value="swiss" label="Swiss citizen" />
              <RadioField
                value="c-permit"
                label="Swiss permanent resident (C permit)"
              />
              <RadioField value="other" label="Other" />
            </RadioGroup>

            {/* Employment + Income row */}
            <Flex direction={isMobile ? "column" : "row"} gap="400">
              <FlexItem size={isMobile ? "full" : "fill"}>
                <SelectField
                  label="Employment status"
                  selectedKey={data.employmentStatus || undefined}
                  onSelectionChange={(k) =>
                    patch({ employmentStatus: String(k) })
                  }
                  placeholder="Select…"
                >
                  <SelectItem id="employed">Employed</SelectItem>
                  <SelectItem id="self-employed">Self-employed</SelectItem>
                  <SelectItem id="retired">Retired</SelectItem>
                  <SelectItem id="student">Student</SelectItem>
                  <SelectItem id="unemployed">Unemployed</SelectItem>
                </SelectField>
              </FlexItem>
              <FlexItem size={isMobile ? "full" : "fill"}>
                <SelectField
                  label="Annual income (gross)"
                  selectedKey={data.annualIncome || undefined}
                  onSelectionChange={(k) =>
                    patch({ annualIncome: String(k) })
                  }
                  placeholder="Select…"
                >
                  <SelectItem id="lt30k">Under CHF 30,000</SelectItem>
                  <SelectItem id="30-60k">CHF 30,000 – CHF 60,000</SelectItem>
                  <SelectItem id="60-120k">
                    CHF 60,000 – CHF 120,000
                  </SelectItem>
                  <SelectItem id="gt120k">Over CHF 120,000</SelectItem>
                </SelectField>
              </FlexItem>
            </Flex>

            {/* Source of funds */}
            <SelectField
              label="Primary source of funds"
              selectedKey={data.sourceOfFunds || undefined}
              onSelectionChange={(k) => patch({ sourceOfFunds: String(k) })}
              placeholder="Select…"
            >
              <SelectItem id="salary">Salary / wages</SelectItem>
              <SelectItem id="business">Business income</SelectItem>
              <SelectItem id="savings">Savings</SelectItem>
              <SelectItem id="inheritance">Inheritance</SelectItem>
              <SelectItem id="investments">Investments</SelectItem>
            </SelectField>

            {/* PEP checkbox */}
            <CheckboxField
              label="I am, or am related to, a politically exposed person (PEP)."
              description="If you check this, an underwriter will contact you within 1 business day."
              isSelected={data.isPEP}
              onChange={(v) => patch({ isPEP: v })}
            />

            <TextSmall>
              In accordance with the Swiss Anti-Money Laundering Act (AMLA),
              Alpen Bank is required to verify the identity of all customers
              before opening an account.
            </TextSmall>

            {/* Actions */}
            <Flex
              direction="row"
              alignSecondary="center"
              style={{ paddingTop: "var(--sds-size-space-800)" }}
            >
              <Button variant="neutral" onPress={back}>
                Back
              </Button>
              <div style={{ flex: "1 0 0" }} />
              <Button variant="primary" onPress={next}>
                Continue
              </Button>
            </Flex>
          </Flex>
        </div>
      </Section>

      <Footer />
    </>
  );
}
