import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import {
  Button,
  CheckboxField,
  InputField,
  TextSubtitle,
  TextTitlePage,
} from "primitives";
import { OnboardingFooter } from "../shared/OnboardingFooter";
import { OnboardingHeader } from "../shared/OnboardingHeader";
import { Stepper } from "../shared/Stepper";
import { type StepProps } from "../types";

export function PersonalInfoStep({ formData, update, onBack, onNext }: StepProps) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <OnboardingHeader />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob-inner">
          <Flex direction="column" gap="800">
            <Stepper currentStep={1} />

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
              value={formData.dob}
              onChange={(v) => update({ dob: v })}
            />

            <InputField
              label="Email address"
              placeholder="you@example.com"
              description="We'll send important account notices here."
              type="email"
              isRequired
              value={formData.email}
              onChange={(v) => update({ email: v })}
            />

            <InputField
              label="Mobile phone"
              placeholder="+41 79 123 45 67"
              description="We'll send a verification code to this number."
              type="tel"
              isRequired
              value={formData.phone}
              onChange={(v) => update({ phone: v })}
            />

            <CheckboxField
              label="Send me account and security alerts by SMS"
              description="You can turn this off anytime in your account settings."
              isSelected={formData.smsAlerts}
              onChange={(v) => update({ smsAlerts: v })}
            />

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
