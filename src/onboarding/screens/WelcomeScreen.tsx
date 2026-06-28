import { useMediaQuery } from "hooks";
import { IconShield, IconSmartphone, IconZap } from "icons";
import { Flex, Section } from "layout";
import {
  Button,
  Tag,
  TextHeading,
  TextSmall,
  TextSubtitle,
  TextTitleHero,
} from "primitives";
import { OnboardingFooter } from "../shared/OnboardingFooter";
import { OnboardingHeader } from "../shared/OnboardingHeader";

export function WelcomeScreen({ onGetStarted }: { onGetStarted: () => void }) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <OnboardingHeader />

      {/* Hero — Alpen Bank brand blue background (#e7f0ff) */}
      <div className="ob-hero-brand">
        <Flex
          container
          direction="column"
          alignPrimary="center"
          alignSecondary="center"
          gap="600"
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
          <Flex direction="row" gap="400" wrap>
            <Button variant="primary" onPress={onGetStarted}>
              Get started
            </Button>
            <Button variant="neutral" onPress={() => {}}>
              I already have an account
            </Button>
          </Flex>
        </Flex>
      </div>

      {/* Feature grid */}
      <Section padding={isMobile ? "800" : "1200"}>
        <Flex container direction="row" gap="600" wrap>
          <div className="ob-feature-card">
            <IconShield size="24" className="ob-feature-icon" aria-hidden="true" />
            <TextHeading>Protected up to CHF 100,000</TextHeading>
            <TextSmall>
              Your deposits are safeguarded under the Swiss depositor
              protection scheme (esisuisse) — automatic coverage, no
              sign-up required.
            </TextSmall>
          </div>
          <div className="ob-feature-card">
            <IconSmartphone size="24" className="ob-feature-icon" aria-hidden="true" />
            <TextHeading>Open and run from your phone</TextHeading>
            <TextSmall>
              Get your IBAN in under 60 seconds. Pay with TWINT, Apple Pay,
              or Google Pay. Freeze your card instantly from the app.
            </TextSmall>
          </div>
          <div className="ob-feature-card">
            <IconZap size="24" className="ob-feature-icon" aria-hidden="true" />
            <TextHeading>1.0% interest on every franc</TextHeading>
            <TextSmall>
              No tiers, no minimums, no teaser rate. Competitive variable
              rate in CHF. Set up a standing order and automatic round-ups
              in seconds.
            </TextSmall>
          </div>
        </Flex>
      </Section>

      <OnboardingFooter />
    </>
  );
}
