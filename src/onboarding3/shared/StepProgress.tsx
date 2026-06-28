import type { ReactNode } from "react";
import { Flex } from "layout";
import { Tag, TextSmall } from "primitives";
import "../onboarding3.css";
import { STEP_COUNT, STEP_NAMES, type StepStatus } from "../types";

function StepBadge({ status, n }: { status: StepStatus; n: number }) {
  if (status === "done") {
    return (
      <Tag variant="secondary" scheme="positive" aria-label="Completed">
        ✓
      </Tag>
    );
  }
  if (status === "active") {
    return <div className="ob3-badge-active">{n}</div>;
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
      const done = i - 1 < step;
      items.push(
        <div key={`ln${i}`} className={done ? "ob3-line ob3-line-done" : "ob3-line"} />,
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
