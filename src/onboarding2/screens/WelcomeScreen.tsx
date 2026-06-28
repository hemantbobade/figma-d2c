import { useMediaQuery } from "hooks";
import { Flex, Section } from "layout";
import { Button, Tag, TextHeading, TextSmall, TextSubtitle, TextTitleHero } from "primitives";
import "../onboarding2.css";
import { Ob2Footer } from "../shared/Ob2Footer";
import { Ob2Header } from "../shared/Ob2Header";

const FEATURES = [
  {
    heading: "Protected up to CHF 100,000",
    body: "Your deposits are safeguarded under the Swiss depositor protection scheme (esisuisse) — automatic coverage, no sign-up required.",
  },
  {
    heading: "Open and run from your phone",
    body: "Get your IBAN in under 60 seconds. Pay with TWINT, Apple Pay, or Google Pay. Freeze your card instantly from the app.",
  },
  {
    heading: "1.0% interest on every franc",
    body: "No tiers, no minimums, no teaser rate. Competitive variable rate in CHF. Set up a standing order and automatic round-ups in seconds.",
  },
];

export function WelcomeScreen({ onGetStarted }: { onGetStarted: () => void }) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <Ob2Header />

      {/* Hero band */}
      <div className="ob2-hero">
        <Section padding={isMobile ? "800" : "1200"}>
          <Flex
            container
            direction="column"
            gap="600"
            alignPrimary="center"
            alignSecondary="center"
          >
            <Tag variant="secondary" scheme="neutral">
              Alpen Bank Personal
            </Tag>
            <TextTitleHero style={{ textAlign: "center" }}>
              Open your account today.
            </TextTitleHero>
            <TextSubtitle style={{ textAlign: "center" }}>
              No paperwork. No minimums. Banking built around you.
            </TextSubtitle>
            <Flex direction={isMobile ? "column" : "row"} gap="400" wrap>
              <Button variant="primary" onPress={onGetStarted}>
                Get started
              </Button>
              <Button variant="neutral" onPress={() => {}}>
                I already have an account
              </Button>
            </Flex>
          </Flex>
        </Section>
      </div>

      {/* Feature grid */}
      <Section padding={isMobile ? "600" : "1000"}>
        <div className="ob2-inner-xl" style={{ margin: "0 auto" }}>
          <Flex direction={isMobile ? "column" : "row"} gap="600">
            {FEATURES.map(({ heading, body }) => (
              <div key={heading} className="ob2-feature-card">
                <Flex direction="column" gap="200">
                  <TextHeading>{heading}</TextHeading>
                  <TextSmall>{body}</TextSmall>
                </Flex>
              </div>
            ))}
          </Flex>
        </div>
      </Section>

      <Ob2Footer />
    </>
  );
}
