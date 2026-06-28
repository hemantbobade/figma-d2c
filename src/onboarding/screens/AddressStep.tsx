import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import {
  Button,
  InputField,
  SelectField,
  SelectItem,
  TextSmall,
  TextStrong,
  TextSubtitle,
  TextTitlePage,
} from "primitives";
import { OnboardingFooter } from "../shared/OnboardingFooter";
import { OnboardingHeader } from "../shared/OnboardingHeader";
import { Stepper } from "../shared/Stepper";
import { type StepProps } from "../types";

export function AddressStep({ formData, update, onBack, onNext }: StepProps) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <OnboardingHeader />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob-inner">
          <Flex direction="column" gap="800">
            <Stepper currentStep={2} />

            <TextTitlePage>Where do you live?</TextTitlePage>
            <TextSubtitle>
              We currently open accounts for Swiss residents only
            </TextSubtitle>

            {/* Info notice */}
            <div className="ob-notice-info">
              <Flex direction="column" gap="100">
                <TextStrong>Swiss residential address required</TextStrong>
                <TextSmall>
                  If you recently moved to Switzerland, make sure your
                  address matches your current residence permit
                </TextSmall>
              </Flex>
            </div>

            {/* Country — disabled, Switzerland only */}
            <SelectField
              label="Country"
              description="🔒 Switzerland only — we do not currently accept applications from outside Switzerland."
              isDisabled
              selectedKey="ch"
            >
              <SelectItem id="ch">Switzerland</SelectItem>
            </SelectField>

            <InputField
              label="Street address"
              placeholder="Bahnhofstrasse 12"
              value={formData.street}
              onChange={(v) => update({ street: v })}
            />

            <InputField
              label="Apartment, suite, unit (optional)"
              placeholder="3rd floor, flat 8"
              value={formData.apartment}
              onChange={(v) => update({ apartment: v })}
            />

            {/* City / Canton / Postcode row */}
            <Flex direction={isMobile ? "column" : "row"} gap="400">
              <FlexItem size={isMobile ? "full" : "fill"}>
                <InputField
                  label="City / Town"
                  placeholder="Zurich"
                  value={formData.city}
                  onChange={(v) => update({ city: v })}
                />
              </FlexItem>
              <FlexItem size={isMobile ? "full" : "half"}>
                <SelectField
                  label="Canton"
                  selectedKey={formData.canton || undefined}
                  onSelectionChange={(k) => update({ canton: String(k) })}
                  placeholder="Select..."
                >
                  <SelectItem id="zh">Zurich</SelectItem>
                  <SelectItem id="be">Bern</SelectItem>
                  <SelectItem id="ge">Geneva</SelectItem>
                  <SelectItem id="vd">Vaud</SelectItem>
                  <SelectItem id="bs">Basel-Stadt</SelectItem>
                </SelectField>
              </FlexItem>
              <FlexItem>
                <InputField
                  label="Postcode"
                  placeholder="8001"
                  style={{ width: 120 }}
                  value={formData.postcode}
                  onChange={(v) => update({ postcode: v })}
                />
              </FlexItem>
            </Flex>

            <SelectField
              label="How long have you lived at this address?"
              selectedKey={formData.duration || undefined}
              onSelectionChange={(k) => update({ duration: String(k) })}
              placeholder="Select duration"
            >
              <SelectItem id="lt1">Less than 1 year</SelectItem>
              <SelectItem id="1-2">1 – 2 years</SelectItem>
              <SelectItem id="3-5">3 – 5 years</SelectItem>
              <SelectItem id="gt5">More than 5 years</SelectItem>
            </SelectField>

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
