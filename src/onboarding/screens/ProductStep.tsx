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
import { OnboardingFooter } from "../shared/OnboardingFooter";
import { OnboardingHeader } from "../shared/OnboardingHeader";
import { Stepper } from "../shared/Stepper";
import { type StepProps } from "../types";

export function ProductStep({ formData, update, onBack, onNext }: StepProps) {
  const { isMobile } = useMediaQuery();
  const { monthlyPlans, annualPlans, currentPlan, setCurrentPlan, isLoading } =
    usePricing();

  const options =
    formData.billingInterval === "monthly" ? monthlyPlans : annualPlans;

  return (
    <>
      <OnboardingHeader />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob-inner-xl">
          <Flex direction="column" gap="800">
            <Stepper currentStep={3} />

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
            <Flex wrap type="third" gap="1200">
              {isLoading ? (
                <>
                  <PricingCardSkeleton size={isMobile ? "small" : "large"} />
                  <PricingCardSkeleton size={isMobile ? "small" : "large"} />
                  <PricingCardSkeleton size={isMobile ? "small" : "large"} />
                </>
              ) : (
                options.map((option, i) => {
                  const props = pricingPlanToPricingCardProps(
                    option,
                    i,
                    currentPlan,
                    setCurrentPlan,
                  );
                  return (
                    <PricingCard
                      key={option.sku}
                      {...props}
                      size={isMobile ? "small" : "large"}
                    />
                  );
                })
              )}
            </Flex>

            {/* Form actions */}
            <Flex direction="row" alignSecondary="center" className="ob-action-row">
              <Button variant="neutral" onPress={onBack}>
                Back
              </Button>
              <div style={{ flex: '1 0 0' }} />
              <Button variant="primary" onPress={onNext}>
                Continue
              </Button>
            </Flex>
          </Flex>
        </div>
      </Section>

      <OnboardingFooter />
    </>
  );
}
