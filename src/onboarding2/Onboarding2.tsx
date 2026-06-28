import { useState } from "react";
import { AddressStep } from "./screens/AddressStep";
import { IdentityStep } from "./screens/IdentityStep";
import { PersonalInfoStep } from "./screens/PersonalInfoStep";
import { ProductStep } from "./screens/ProductStep";
import { ReviewStep } from "./screens/ReviewStep";
import { SuccessScreen } from "./screens/SuccessScreen";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { INITIAL_FORM, type Onboarding2FormData } from "./types";

/**
 * Onboarding2 — Alpen Bank account opening flow.
 * All 7 screens implemented fresh from Figma designs.
 * No code reuse from src/onboarding/.
 *
 * Screens:
 *   0  Welcome
 *   1  Personal Information   (step 1 of 5)
 *   2  Address                (step 2 of 5)
 *   3  Product Selection      (step 3 of 5)
 *   4  Identity Verification  (step 4 of 5)
 *   5  Review & Confirm       (step 5 of 5)
 *   6  Success
 */
export function Onboarding2() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Onboarding2FormData>(INITIAL_FORM);

  const update = (fields: Partial<Onboarding2FormData>) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  const goNext = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => s - 1);
  const goToStep = (target: number) => setStep(target);

  const stepProps = { formData, update, onBack: goBack, onNext: goNext };

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
      />
    );
  }
  return (
    <SuccessScreen
      userEmail={formData.email}
      firstName={formData.firstName}
    />
  );
}
