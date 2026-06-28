import { useMediaQuery } from "hooks";
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
import "../onboarding2.css";
import { Ob2Footer } from "../shared/Ob2Footer";
import { Ob2Header } from "../shared/Ob2Header";

const REFERENCE_NUMBER = "AB-2026-A14C9";

const NEXT_STEPS = [
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
] as const;

export function SuccessScreen({
  userEmail,
  firstName,
}: {
  userEmail: string;
  firstName: string;
}) {
  const { isMobile } = useMediaQuery();
  const displayName = firstName ? `, ${firstName}` : "";
  const displayEmail = userEmail || "jane.doe@example.com";

  return (
    <>
      <Ob2Header />

      {/* Success hero */}
      <div className="ob2-success-hero">
        <Section padding={isMobile ? "800" : "1200"}>
          <Flex
            container
            direction="column"
            gap="600"
            alignPrimary="center"
            alignSecondary="center"
          >
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
        </Section>
      </div>

      {/* What happens next */}
      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob2-inner-review" style={{ margin: "0 auto" }}>
          <Flex direction="column" gap="600">
            {/* Confirmation card */}
            <div className="ob2-review-card">
              <Flex direction="column" gap="600">
                <TextHeading>What happens next</TextHeading>

                {NEXT_STEPS.map(({ num, heading, body }) => (
                  <Flex
                    key={num}
                    direction="row"
                    gap="400"
                    alignSecondary="start"
                  >
                    <div className="ob2-number-circle">{num}</div>
                    <Flex direction="column" gap="100">
                      <TextHeading elementType="p">{heading}</TextHeading>
                      <TextSmall>{body}</TextSmall>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </div>

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

      <Ob2Footer />
    </>
  );
}
