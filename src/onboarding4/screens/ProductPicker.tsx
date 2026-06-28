import {
  PricingCard,
  PricingCardSkeleton,
  pricingPlanToPricingCardProps,
} from "compositions";
import { usePricing } from "data";
import { useMediaQuery } from "hooks";
import { Flex, Section } from "layout";
import {
  Button,
  Navigation,
  NavigationPill,
  TextSubtitle,
  TextTitlePage,
} from "primitives";
import "../onboarding4.css";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";
import { StepProgress } from "../shared/StepProgress";
import { type ScreenProps } from "../types";

export function ProductPicker({ data, patch, back, next }: ScreenProps) {
  const { isMobile } = useMediaQuery();
  const { monthlyPlans, annualPlans, currentPlan, setCurrentPlan, isLoading } =
    usePricing();

  const plans =
    data.billingInterval === "monthly" ? monthlyPlans : annualPlans;

  return (
    <>
      <Header />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob4-wide">
          <Flex direction="column" gap="800">
            <StepProgress step={3} />

            <TextTitlePage>Choose your account</TextTitlePage>
            <TextSubtitle>
              You can add more accounts anytime, with no fees.
            </TextSubtitle>

            {/* Billing interval toggle */}
            <Flex alignPrimary="center">
              <Navigation direction="row">
                <NavigationPill
                  isSelected={data.billingInterval === "monthly"}
                  onPress={() => patch({ billingInterval: "monthly" })}
                >
                  Monthly
                </NavigationPill>
                <NavigationPill
                  isSelected={data.billingInterval === "yearly"}
                  onPress={() => patch({ billingInterval: "yearly" })}
                >
                  Yearly
                </NavigationPill>
              </Navigation>
            </Flex>

            {/* Pricing cards */}
            <Flex
              direction={isMobile ? "column" : "row"}
              gap={isMobile ? "600" : "1200"}
              wrap
            >
              {isLoading ? (
                <>
                  <PricingCardSkeleton size={isMobile ? "small" : "large"} />
                  <PricingCardSkeleton size={isMobile ? "small" : "large"} />
                  <PricingCardSkeleton size={isMobile ? "small" : "large"} />
                </>
              ) : (
                plans.map((plan, i) => {
                  const props = pricingPlanToPricingCardProps(
                    plan,
                    i,
                    currentPlan,
                    setCurrentPlan,
                  );
                  return (
                    <PricingCard
                      key={plan.sku}
                      {...props}
                      size={isMobile ? "small" : "large"}
                    />
                  );
                })
              )}
            </Flex>

            {/* Actions */}
            <Flex
              direction="row"
              alignSecondary="center"
              style={{ paddingTop: "var(--sds-size-space-800)" }}
            >
              <Button variant="neutral" onPress={back}>
                Back
              </Button>
              <div style={{ flex: "1 0 0" }} />
              <Button variant="primary" onPress={next}>
                Continue
              </Button>
            </Flex>
          </Flex>
        </div>
      </Section>

      <Footer />
    </>
  );
}
