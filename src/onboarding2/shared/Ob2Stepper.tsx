import type { ReactNode } from "react";
import { Flex } from "layout";
import { Tag, TextSmall } from "primitives";
import "../onboarding2.css";
import { STEP_LABELS, TOTAL_STEPS, type StepStatus } from "../types";

function StepBadge({ status, number }: { status: StepStatus; number: number }) {
  if (status === "done") {
    return (
      <Tag variant="secondary" scheme="positive" aria-label="Completed">
        ✓
      </Tag>
    );
  }
  if (status === "active") {
    return <div className="ob2-step-badge">{number}</div>;
  }
  return (
    <Tag variant="secondary" scheme="neutral">
      {number}
    </Tag>
  );
}

export function Ob2Stepper({ currentStep }: { currentStep: number }) {
  const steps = Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1);

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
            connectorDone ? "ob2-connector ob2-connector-done" : "ob2-connector"
          }
        />,
      );
    }
    dotElements.push(
      <StepBadge key={`s-${step}`} status={getStatus(step)} number={step} />,
    );
  });

  return (
    <Flex direction="column" gap="200">
      <Flex direction="row" alignSecondary="center" gap="200">
        {dotElements}
      </Flex>
      <TextSmall>
        Step {currentStep} of {TOTAL_STEPS} -{" "}
        {STEP_LABELS[currentStep - 1]}
      </TextSmall>
    </Flex>
  );
}
