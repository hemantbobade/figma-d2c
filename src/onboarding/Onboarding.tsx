import { useState } from "react";
import "./onboarding.css";
import { AddressStep } from "./screens/AddressStep";
import { IdentityStep } from "./screens/IdentityStep";
import { PersonalInfoStep } from "./screens/PersonalInfoStep";
import { ProductStep } from "./screens/ProductStep";
import { ReviewStep } from "./screens/ReviewStep";
import { SuccessScreen } from "./screens/SuccessScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { INITIAL_FORM, type OnboardingFormData, type StepProps } from "./types";

/**
 * Alpen Bank Onboarding flow — 7 screens:
 *   0  Welcome
 *   1  Personal Information    (step 1 of 5)
 *   2  Address                 (step 2 of 5)
 *   3  Product Selection       (step 3 of 5)
 *   4  Identity Verification   (step 4 of 5)
 *   5  Review & Confirm        (step 5 of 5)
 *   6  Success
 */
export function Onboarding() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingFormData>(INITIAL_FORM);

  const update = (fields: Partial<OnboardingFormData>) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  const goNext = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => s - 1);
  const goToStep = (target: number) => setStep(target);

  const stepProps: StepProps = {
    formData,
    update,
    onBack: goBack,
    onNext: goNext,
  };

  if (step === 0) return <WelcomeScreen onGetStarted={goNext} />;
  if (step === 1) return <PersonalInfoStep {...stepProps} />;
  if (step === 2) return <AddressStep {...stepProps} />;
  if (step === 3) return <ProductStep {...stepProps} />;
  if (step === 4) return <IdentityStep {...stepProps} />;
  if (step === 5) {
    return (
      <ReviewStep
        {...stepProps}
        onEditStep={goToStep}
        onSubmit={goNext}
        selectedPlanName=""
        selectedPlanPrice=""
        selectedAddOns=""
      />
    );
  }
  return (
    <SuccessScreen userEmail={formData.email} firstName={formData.firstName} />
  );
}