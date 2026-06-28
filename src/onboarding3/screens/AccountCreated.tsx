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
import "../onboarding3.css";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";

const REF_NUMBER = "AB-2026-A14C9";

const NEXT_STEPS = [
  {
    n: 1,
    heading: "Check your inbox",
    body: "We’ll send a welcome email with your reference number and what to expect next.",
  },
  {
    n: 2,
    heading: "Download the Alpen Bank app",
    body: "Sign in with your email and the code we just sent. Set up Face ID or fingerprint and a 6-digit PIN.",
  },
  {
    n: 3,
    heading: "Fund your account",
    body: "Transfer funds from any Swiss or EU bank. First deposits are available the same day, up to CHF 5,000.",
  },
] as const;

export function AccountCreated({
  email,
  name,
}: {
  email: string;
  name: string;
}) {
  const { isMobile } = useMediaQuery();
  const greeting = name ? `, ${name}` : "";
  const displayEmail = email || "jane.doe@example.com";

  return (
    <>
      <Header />

      {/* Success hero */}
      <div className="ob3-success-band">
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
              You’re all set{greeting}!
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
              <TextEmphasis>{REF_NUMBER}</TextEmphasis>
            </Flex>
          </Flex>
        </Section>
      </div>

      {/* What happens next */}
      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob3-mid">
          <Flex direction="column" gap="600">
            <div className="ob3-review-card">
              <Flex direction="column" gap="600">
                <TextHeading>What happens next</TextHeading>

                {NEXT_STEPS.map(({ n, heading, body }) => (
                  <Flex
                    key={n}
                    direction="row"
                    gap="400"
                    alignSecondary="start"
                  >
                    <div className="ob3-num-circle">{n}</div>
                    <Flex direction="column" gap="100">
                      <TextHeading elementType="p">{heading}</TextHeading>
                      <TextSmall>{body}</TextSmall>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </div>

            {/* CTAs */}
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

            {/* Help */}
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

      <Footer />
    </>
  );
}
