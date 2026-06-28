import { Flex, Section } from "layout";
import { TextHeading, TextLink } from "primitives";

export function OnboardingHeader() {
  return (
    <Section
      elementType="header"
      variant="subtle"
      padding="600"
      className="ob-nav-header"
    >
      <Flex container alignPrimary="space-between" alignSecondary="center">
        <TextHeading elementType="p">Alpen Bank</TextHeading>
        <TextLink href="#">Need help?</TextLink>
      </Flex>
    </Section>
  );
}
