import { Flex, Section } from "layout";
import { TextLink, TextSmall } from "primitives";

export function OnboardingFooter() {
  return (
    <Section
      elementType="footer"
      variant="subtle"
      padding="600"
      className="ob-nav-footer"
    >
      <Flex container alignPrimary="space-between" alignSecondary="center">
        <TextSmall>© 2026 Alpen Bank AG</TextSmall>
        <Flex gap="600" alignSecondary="center">
          <TextLink href="#">Privacy</TextLink>
          <TextLink href="#">Terms</TextLink>
          <TextLink href="#">Accessibility</TextLink>
          <TextLink href="#">Contact us</TextLink>
        </Flex>
      </Flex>
    </Section>
  );
}
