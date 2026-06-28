import { Flex, Section } from "layout";
import { TextHeading, TextLink } from "primitives";
import "../onboarding2.css";

export function Ob2Header() {
  return (
    <Section elementType="header" padding="600" className="ob2-header">
      <Flex direction="row" alignSecondary="center" gap="600">
        <TextHeading>Alpen Bank</TextHeading>
        <div style={{ flex: "1 0 0" }} />
        <TextLink href="#">Need help?</TextLink>
      </Flex>
    </Section>
  );
}
