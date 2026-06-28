import { Flex, Section } from "layout";
import { TextLink, TextSmall } from "primitives";

export function Ob2Footer() {
  return (
    <Section elementType="footer" padding="600">
      <Flex direction="row" alignSecondary="center" gap="600">
        <TextSmall>© 2026 Alpen Bank AG</TextSmall>
        <div style={{ flex: "1 0 0" }} />
        <TextLink href="#">Privacy</TextLink>
        <TextLink href="#">Terms</TextLink>
        <TextLink href="#">Accessibility</TextLink>
        <TextLink href="#">Contact us</TextLink>
      </Flex>
    </Section>
  );
}
