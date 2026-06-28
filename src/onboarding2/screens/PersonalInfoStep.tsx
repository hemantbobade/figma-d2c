import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import {
  Button,
  CheckboxField,
  InputField,
  TextSubtitle,
  TextTitlePage,
} from "primitives";
import "../onboarding2.css";
import { Ob2Footer } from "../shared/Ob2Footer";
import { Ob2Header } from "../shared/Ob2Header";
import { Ob2Stepper } from "../shared/Ob2Stepper";
import { type StepProps2 } from "../types";

export function PersonalInfoStep({
  formData,
  update,
  onBack,
  onNext,
}: StepProps2) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <Ob2Header />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob2-inner" style={{ margin: "0 auto" }}>
          <Flex direction="column" gap="800">
            <Ob2Stepper currentStep={1} />

            <TextTitlePage>Tell us a bit about you</TextTitlePage>
            <TextSubtitle>
              We need a few details to verify your identity
            </TextSubtitle>

            {/* Name row */}
            <Flex direction={isMobile ? "column" : "row"} gap="400">
              <FlexItem size={isMobile ? "full" : "half"}>
                <InputField
                  label="Legal first name"
                  placeholder="Jane"
                  isRequired
                  value={formData.firstName}
                  onChange={(v) => update({ firstName: v })}
                />
              </FlexItem>
              <FlexItem size={isMobile ? "full" : "half"}>
                <InputField
                  label="Legal last name"
                  placeholder="Doe"
                  isRequired
                  value={formData.lastName}
                  onChange={(v) => update({ lastName: v })}
                />
              </FlexItem>
            </Flex>

            <InputField
              label="Date of birth"
              placeholder="DD / MM / YYYY"
              description="You must be 18 or older to open an account."
              isRequired
              value={formData.dateOfBirth}
              onChange={(v) => update({ dateOfBirth: v })}
            />

            <InputField
              label="Email address"
              placeholder="you@example.com"
              description="We'll send important account notices here."
              isRequired
              type="email"
              value={formData.email}
              onChange={(v) => update({ email: v })}
            />

            <InputField
              label="Mobile phone"
              placeholder="+41 79 123 45 67"
              description="We'll send a verification code to this number."
              isRequired
              type="tel"
              value={formData.phone}
              onChange={(v) => update({ phone: v })}
            />

            <CheckboxField
              label="Send me account and security alerts by SMS"
              description="You can turn this off anytime in your account settings."
              isSelected={formData.smsOptIn}
              onChange={(v) => update({ smsOptIn: v })}
            />

            {/* Form actions */}
            <Flex direction="row" alignSecondary="center">
              <Button variant="neutral" onPress={onBack}>
                Back
              </Button>
              <div style={{ flex: "1 0 0" }} />
              <Button variant="primary" onPress={onNext}>
                Continue
              </Button>
            </Flex>
          </Flex>
        </div>
      </Section>

      <Ob2Footer />
    </>
  );
}
