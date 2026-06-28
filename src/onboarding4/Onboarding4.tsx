import { useState } from "react";
import { AccountCreated } from "./screens/AccountCreated";
import { Address } from "./screens/Address";
import { IdentityCheck } from "./screens/IdentityCheck";
import { PersonalInfo } from "./screens/PersonalInfo";
import { ProductPicker } from "./screens/ProductPicker";
import { ReviewConfirm } from "./screens/ReviewConfirm";
import { Welcome } from "./screens/Welcome";
import { EMPTY_FORM, type FormData, type ScreenProps } from "./types";

/**
 * Onboarding4 — Alpen Bank account opening flow.
 * Generated fresh from Figma designs (nodes 3541:80535, 80592, 80703, 81615,
 * 80908, 81062, 81248). No reuse from onboarding3 or earlier.
 *
 * Step index:
 *   0  Welcome
 *   1  Personal information  (step 1 of 5)
 *   2  Address               (step 2 of 5)
 *   3  Product selection     (step 3 of 5)
 *   4  Identity verification (step 4 of 5)
 *   5  Review & confirm      (step 5 of 5)
 *   6  Account created
 */
export function Onboarding4() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);

  const patch = (fields: Partial<FormData>) =>
    setFormData((prev) => ({ ...prev, ...fields }));
  const goNext = () => setStep((s) => s + 1);
  const goBack = () => setStep((s) => s - 1);
  const jumpTo = (n: number) => setStep(n);

  const sp: ScreenProps = { data: formData, patch, back: goBack, next: goNext };

  if (step === 0) return <Welcome onStart={goNext} />;
  if (step === 1) return <PersonalInfo {...sp} />;
  if (step === 2) return <Address {...sp} />;
  if (step === 3) return <ProductPicker {...sp} />;
  if (step === 4) return <IdentityCheck {...sp} />;
  if (step === 5) {
    return (
      <ReviewConfirm {...sp} jumpTo={jumpTo} onSubmit={goNext} />
    );
  }
  return <AccountCreated email={formData.email} name={formData.firstName} />;
}
