import { type ReactNode } from "react";
import { Flex } from "layout";
import { Tag, TextSmall } from "primitives";
import "../onboarding4.css";
import { STEP_COUNT, STEP_NAMES, type StepStatus } from "../types";

function StepBadge({ status, n }: { status: StepStatus; n: number }) {
  if (status === "done") {
    return (
      <Tag variant="secondary" scheme="positive">
        ✓
      </Tag>
    );
  }
  if (status === "active") {
    return <div className="ob4-badge-active">{n}</div>;
  }
  return (
    <Tag variant="secondary" scheme="neutral">
      {n}
    </Tag>
  );
}

export function StepProgress({ step }: { step: number }) {
  const items: ReactNode[] = [];
  for (let i = 1; i <= STEP_COUNT; i++) {
    if (i > 1) {
      const prevDone = i - 1 < step;
      items.push(
        <div
          key={`ln${i}`}
          className={prevDone ? "ob4-line ob4-line-done" : "ob4-line"}
          aria-hidden="true"
        />,
      );
    }
    const status: StepStatus =
      i < step ? "done" : i === step ? "active" : "pending";
    items.push(<StepBadge key={`bd${i}`} status={status} n={i} />);
  }

  return (
    <Flex direction="column" gap="200">
      <Flex direction="row" alignSecondary="center" gap="200">
        {items}
      </Flex>
      <TextSmall>
        Step {step} of {STEP_COUNT} – {STEP_NAMES[step - 1]}
      </TextSmall>
    </Flex>
  );
}
