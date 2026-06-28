import { Card } from "compositions";
import { useMediaQuery } from "hooks";
import { Flex, Section } from "layout";
import {
  Button,
  Tag,
  TextHeading,
  TextSmall,
  TextSubtitle,
  TextTitleHero,
} from "primitives";
import "../onboarding4.css";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";

const FEATURES = [
  {
    title: "Protected up to CHF 100,000",
    body: "Your deposits are safeguarded under the Swiss depositor protection scheme (esisuisse) — automatic coverage, no sign-up required.",
  },
  {
    title: "Open and run from your phone",
    body: "Get your IBAN in under 60 seconds. Pay with TWINT, Apple Pay, or Google Pay. Freeze your card instantly from the app.",
  },
  {
    title: "1.0% interest on every franc",
    body: "No tiers, no minimums, no teaser rate. Competitive variable rate in CHF. Set up a standing order and automatic round-ups in seconds.",
  },
] as const;

export function Welcome({ onStart }: { onStart: () => void }) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <Header />

      {/* Hero band */}
      <div className="ob4-hero">
        <Section padding={isMobile ? "800" : "1600"}>
          <div className="ob4-hero-inner">
            <Flex
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
              <Flex
                direction={isMobile ? "column" : "row"}
                gap="400"
                alignPrimary="center"
                wrap
                style={{ paddingTop: "var(--sds-size-space-400)" }}
              >
                <Button variant="primary" onPress={onStart}>
                  Get started
                </Button>
                <Button variant="neutral" onPress={() => {}}>
                  I already have an account
                </Button>
              </Flex>
            </Flex>
          </div>
        </Section>
      </div>

      {/* Feature grid */}
      <Section padding={isMobile ? "600" : "1200"}>
        <div className="ob4-wide">
          <Flex direction={isMobile ? "column" : "row"} gap="600">
            {FEATURES.map((f) => (
              <Card key={f.title} variant="stroke" padding="600">
                <Flex direction="column" gap="200">
                  <TextHeading>{f.title}</TextHeading>
                  <TextSmall>{f.body}</TextSmall>
                </Flex>
              </Card>
            ))}
          </Flex>
        </div>
      </Section>

      <Footer />
    </>
  );
}
