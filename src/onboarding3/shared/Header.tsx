import { Flex, Section } from "layout";
import { TextHeading, TextLink } from "primitives";
import "../onboarding3.css";

export function Header() {
  return (
    <div className="ob3-header-wrap">
      <Section elementType="header" padding="600">
        <Flex direction="row" alignSecondary="center" gap="600">
          <TextHeading>Alpen Bank</TextHeading>
          <div style={{ flex: "1 0 0" }} />
          <TextLink href="#">Need help?</TextLink>
        </Flex>
      </Section>
    </div>
  );
}
