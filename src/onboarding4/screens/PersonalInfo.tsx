import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import {
  Button,
  CheckboxField,
  InputField,
  TextSubtitle,
  TextTitlePage,
} from "primitives";
import "../onboarding4.css";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";
import { StepProgress } from "../shared/StepProgress";
import { type ScreenProps } from "../types";

export function PersonalInfo({ data, patch, back, next }: ScreenProps) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <Header />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob4-narrow">
          <Flex direction="column" gap="800">
            <StepProgress step={1} />

            <TextTitlePage>Tell us a bit about you</TextTitlePage>
            <TextSubtitle>
              We need a few details to verify your identity
            </TextSubtitle>

            {/* Name row */}
            <Flex direction={isMobile ? "column" : "row"} gap="400">
              <FlexItem size="fill">
                <InputField
                  label="Legal first name"
                  placeholder="Jane"
                  isRequired
                  value={data.firstName}
                  onChange={(v) => patch({ firstName: v })}
                />
              </FlexItem>
              <FlexItem size="fill">
                <InputField
                  label="Legal last name"
                  placeholder="Doe"
                  isRequired
                  value={data.lastName}
                  onChange={(v) => patch({ lastName: v })}
                />
              </FlexItem>
            </Flex>

            <InputField
              label="Date of birth"
              placeholder="DD / MM / YYYY"
              description="You must be 18 or older to open an account."
              isRequired
              value={data.dateOfBirth}
              onChange={(v) => patch({ dateOfBirth: v })}
            />

            <InputField
              label="Email address"
              placeholder="you@example.com"
              description="We'll send important account notices here."
              isRequired
              type="email"
              value={data.email}
              onChange={(v) => patch({ email: v })}
            />

            <InputField
              label="Mobile phone"
              placeholder="+41 79 123 45 67"
              description="We'll send a verification code to this number."
              isRequired
              type="tel"
              value={data.phone}
              onChange={(v) => patch({ phone: v })}
            />

            <CheckboxField
              label="Send me account and security alerts by SMS"
              description="You can turn this off anytime in your account settings."
              isSelected={data.smsOptIn}
              onChange={(v) => patch({ smsOptIn: v })}
            />

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
