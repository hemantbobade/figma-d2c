import type { ReactNode } from "react";
import { Tag, TextSmall } from "primitives";
import { STEP_LABELS, TOTAL_FORM_STEPS, type StepStatus } from "../types";

function StepBadge({
  status,
  number,
}: {
  status: StepStatus;
  number: number;
}) {
  if (status === "done") {
    return (
      <Tag variant="secondary" scheme="positive" aria-label="Completed">
        ✓
      </Tag>
    );
  }
  if (status === "active") {
    return <div className="ob-step-badge">{number}</div>;
  }
  return (
    <Tag variant="secondary" scheme="neutral">
      {number}
    </Tag>
  );
}

export function Stepper({ currentStep }: { currentStep: number }) {
  const steps = Array.from({ length: TOTAL_FORM_STEPS }, (_, i) => i + 1);

  const getStatus = (step: number): StepStatus => {
    if (step < currentStep) return "done";
    if (step === currentStep) return "active";
    return "pending";
  };

  const dotElements: ReactNode[] = [];
  steps.forEach((step, i) => {
    if (i > 0) {
      const connectorDone = step - 1 < currentStep;
      dotElements.push(
        <div
          key={`c-${i}`}
          className={
            connectorDone ? "ob-connector ob-connector-done" : "ob-connector"
          }
        />,
      );
    }
    dotElements.push(
      <StepBadge key={`s-${step}`} status={getStatus(step)} number={step} />,
    );
  });

  return (
    <div className="ob-stepper">
      <div className="ob-stepper-row">{dotElements}</div>
      <TextSmall>
        Step {currentStep} of {TOTAL_FORM_STEPS} - {STEP_LABELS[currentStep - 1]}
      </TextSmall>
    </div>
  );
}
