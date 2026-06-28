import { PricingCard, PricingCardSkeleton, pricingPlanToPricingCardProps } from "compositions";
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
import "../onboarding2.css";
import { Ob2Footer } from "../shared/Ob2Footer";
import { Ob2Header } from "../shared/Ob2Header";
import { Ob2Stepper } from "../shared/Ob2Stepper";
import { type StepProps2 } from "../types";

export function ProductStep({ formData, update, onBack, onNext }: StepProps2) {
  const { isMobile } = useMediaQuery();
  const { monthlyPlans, annualPlans, currentPlan, setCurrentPlan, isLoading } =
    usePricing();

  const options =
    formData.billingInterval === "monthly" ? monthlyPlans : annualPlans;

  return (
    <>
      <Ob2Header />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob2-inner-xl" style={{ margin: "0 auto" }}>
          <Flex direction="column" gap="800">
            <Ob2Stepper currentStep={3} />

            <TextTitlePage>Choose your account</TextTitlePage>
            <TextSubtitle>
              You can add more accounts anytime, with no fees.
            </TextSubtitle>

            {/* Billing interval toggle */}
            <Flex alignPrimary="center">
              <Navigation direction="row">
                <NavigationPill
                  isSelected={formData.billingInterval === "monthly"}
                  onPress={() => update({ billingInterval: "monthly" })}
                >
                  Monthly
                </NavigationPill>
                <NavigationPill
                  isSelected={formData.billingInterval === "yearly"}
                  onPress={() => update({ billingInterval: "yearly" })}
                >
                  Yearly
                </NavigationPill>
              </Navigation>
            </Flex>

            {/* Pricing cards */}
            <Flex wrap type="third" gap={isMobile ? "600" : "1200"}>
              {isLoading ? (
                <>
                  <PricingCardSkeleton size={isMobile ? "small" : "large"} />
                  <PricingCardSkeleton size={isMobile ? "small" : "large"} />
                  <PricingCardSkeleton size={isMobile ? "small" : "large"} />
                </>
              ) : (
                options.map((plan, i) => {
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

            {/* Form actions */}
            <Flex direction="row" alignSecondary="center">
              <Button variant="neutral" onPress={onBack}>
                Back
              </Button>
              <div style={{ flex: "1 0 0" }} />
              <Button variant="primary" onPress={onNext}>
                Continue
              </Button>
            </Flex>
          </Flex>
        </div>
      </Section>

      <Ob2Footer />
    </>
  );
}
