import { Card } from "compositions";
import { IconCheckCircle } from "icons";
import { Flex, Section } from "layout";
import {
  Button,
  Tag,
  TextEmphasis,
  TextHeading,
  TextLink,
  TextSmall,
  TextSubtitle,
  TextTitleHero,
} from "primitives";
import { OnboardingFooter } from "../shared/OnboardingFooter";
import { OnboardingHeader } from "../shared/OnboardingHeader";

const REFERENCE_NUMBER = "AB-2026-A14C9";

export function SuccessScreen({
  userEmail,
  firstName,
}: {
  userEmail: string;
  firstName: string;
}) {
  const displayName = firstName ? `, ${firstName}` : "";
  const displayEmail = userEmail || "jane.doe@example.com";

  return (
    <>
      <OnboardingHeader />

      {/* Hero band */}
      <div className="ob-hero-brand">
        <Flex
          container
          direction="column"
          alignPrimary="center"
          alignSecondary="center"
          gap="600"
        >
          <div className="ob-success-check">
            <IconCheckCircle size="48" aria-hidden="true" />
          </div>
          <Tag variant="secondary" scheme="positive">
            Application submitted
          </Tag>
          <TextTitleHero style={{ textAlign: "center" }}>
            You're all set{displayName}!
          </TextTitleHero>
          <TextSubtitle style={{ textAlign: "center" }}>
            Confirmation email sent to {displayEmail}.
          </TextSubtitle>
          <Flex
            direction="row"
            gap="100"
            alignSecondary="center"
            style={{ paddingTop: "var(--sds-size-space-400)" }}
          >
            <TextSmall>Reference number:</TextSmall>
            <TextEmphasis>{REFERENCE_NUMBER}</TextEmphasis>
          </Flex>
        </Flex>
      </div>

      {/* Confirmation block */}
      <Section padding="1200">
        <div className="ob-inner-wide">
          <Flex direction="column" gap="600">
            <Card variant="stroke" padding="600">
              <Flex direction="column" gap="600">
                <TextHeading>What happens next</TextHeading>

                {(
                  [
                    {
                      num: 1,
                      heading: "Check your inbox",
                      body: "We'll send a welcome email with your reference number and what to expect next.",
                    },
                    {
                      num: 2,
                      heading: "Download the Alpen Bank app",
                      body: "Sign in with your email and the code we just sent. Set up Face ID or fingerprint and a 6-digit PIN.",
                    },
                    {
                      num: 3,
                      heading: "Fund your account",
                      body: "Transfer funds from any Swiss or EU bank. First deposits are available the same day, up to CHF 5,000.",
                    },
                  ] as const
                ).map(({ num, heading, body }) => (
                  <Flex key={num} direction="row" gap="400" alignSecondary="start">
                    <div className="ob-number-circle">
                      <span className="ob-number-circle-text">{num}</span>
                    </div>
                    <Flex direction="column" gap="100">
                      <TextHeading elementType="p">{heading}</TextHeading>
                      <TextSmall>{body}</TextSmall>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Card>

            {/* CTA row */}
            <Flex
              direction="row"
              alignPrimary="center"
              gap="400"
              wrap
              style={{ paddingTop: "var(--sds-size-space-800)" }}
            >
              <Button variant="neutral" onPress={() => {}}>
                Download the app
              </Button>
              <Button variant="primary" onPress={() => {}}>
                Go to dashboard
              </Button>
            </Flex>

            {/* Help row */}
            <Flex
              direction="row"
              alignPrimary="center"
              alignSecondary="center"
              gap="200"
            >
              <TextSmall>Questions?</TextSmall>
              <TextLink href="#">Chat with Alpen Bank Support</TextLink>
            </Flex>
          </Flex>
        </div>
      </Section>

      <OnboardingFooter />
    </>
  );
}
