import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import {
  Button,
  InputField,
  SelectField,
  SelectItem,
  TextStrong,
  TextSmall,
  TextSubtitle,
  TextTitlePage,
} from "primitives";
import "../onboarding2.css";
import { Ob2Footer } from "../shared/Ob2Footer";
import { Ob2Header } from "../shared/Ob2Header";
import { Ob2Stepper } from "../shared/Ob2Stepper";
import { type StepProps2 } from "../types";

const CANTONS = [
  { id: "ZH", label: "Zürich (ZH)" },
  { id: "BE", label: "Bern (BE)" },
  { id: "LU", label: "Luzern (LU)" },
  { id: "ZG", label: "Zug (ZG)" },
  { id: "GE", label: "Geneva (GE)" },
  { id: "VD", label: "Vaud (VD)" },
  { id: "BS", label: "Basel-Stadt (BS)" },
  { id: "BL", label: "Basel-Landschaft (BL)" },
  { id: "AG", label: "Aargau (AG)" },
  { id: "SG", label: "St. Gallen (SG)" },
  { id: "TI", label: "Ticino (TI)" },
  { id: "VS", label: "Valais (VS)" },
  { id: "FR", label: "Fribourg (FR)" },
  { id: "GR", label: "Graubünden (GR)" },
  { id: "TG", label: "Thurgau (TG)" },
  { id: "SO", label: "Solothurn (SO)" },
  { id: "NE", label: "Neuchâtel (NE)" },
  { id: "SH", label: "Schaffhausen (SH)" },
  { id: "SZ", label: "Schwyz (SZ)" },
  { id: "UR", label: "Uri (UR)" },
  { id: "AR", label: "Appenzell Ausserrhoden (AR)" },
  { id: "AI", label: "Appenzell Innerrhoden (AI)" },
  { id: "GL", label: "Glarus (GL)" },
  { id: "NW", label: "Nidwalden (NW)" },
  { id: "OW", label: "Obwalden (OW)" },
  { id: "JU", label: "Jura (JU)" },
];

export function AddressStep({ formData, update, onBack, onNext }: StepProps2) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <Ob2Header />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob2-inner" style={{ margin: "0 auto" }}>
          <Flex direction="column" gap="800">
            <Ob2Stepper currentStep={2} />

            <TextTitlePage>Where do you live?</TextTitlePage>
            <TextSubtitle>
              We currently open accounts for Swiss residents only
            </TextSubtitle>

            {/* Swiss residents notice */}
            <div className="ob2-notice-info">
              <Flex direction="column" gap="100">
                <TextStrong>Swiss residential address required</TextStrong>
                <TextSmall>
                  If you recently moved to Switzerland, make sure your address
                  matches your current residence permit
                </TextSmall>
              </Flex>
            </div>

            {/* Country (disabled) */}
            <SelectField
              label="Switzerland"
              description="Only Swiss residents are eligible at this time."
              isDisabled
              selectedKey="CH"
              onSelectionChange={() => {}}
              placeholder="Switzerland"
            >
              <SelectItem id="CH">Switzerland</SelectItem>
            </SelectField>

            <InputField
              label="Street address"
              placeholder="Bahnhofstrasse 12"
              isRequired
              value={formData.streetAddress}
              onChange={(v) => update({ streetAddress: v })}
            />

            <InputField
              label="Apartment, suite, unit (optional)"
              placeholder="3rd floor, flat 8"
              value={formData.apartment}
              onChange={(v) => update({ apartment: v })}
            />

            {/* City / Canton / Postcode row */}
            <Flex direction={isMobile ? "column" : "row"} gap="400">
              <FlexItem size={isMobile ? "full" : "half"}>
                <InputField
                  label="City / Town"
                  placeholder="Zurich"
                  isRequired
                  value={formData.city}
                  onChange={(v) => update({ city: v })}
                />
              </FlexItem>
              <SelectField
                label="Canton"
                selectedKey={formData.canton || undefined}
                onSelectionChange={(k) => update({ canton: String(k) })}
                placeholder="Select..."
              >
                {CANTONS.map(({ id, label }) => (
                  <SelectItem key={id} id={id}>
                    {label}
                  </SelectItem>
                ))}
              </SelectField>
              <InputField
                label="Postcode"
                placeholder="8001"
                isRequired
                value={formData.postcode}
                onChange={(v) => update({ postcode: v })}
              />
            </Flex>

            <SelectField
              label="Duration"
              selectedKey={formData.addressDuration || undefined}
              onSelectionChange={(k) =>
                update({ addressDuration: String(k) })
              }
              placeholder="Select duration"
            >
              <SelectItem id="lt1">Less than 1 year</SelectItem>
              <SelectItem id="1-2">1 – 2 years</SelectItem>
              <SelectItem id="3-5">3 – 5 years</SelectItem>
              <SelectItem id="gt5">More than 5 years</SelectItem>
            </SelectField>

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
