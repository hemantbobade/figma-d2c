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
import "../onboarding4.css";
import { Footer } from "../shared/Footer";
import { Header } from "../shared/Header";
import { StepProgress } from "../shared/StepProgress";
import { type ScreenProps } from "../types";

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
  { id: "GL", label: "Glarus (GL)" },
  { id: "JU", label: "Jura (JU)" },
  { id: "NW", label: "Nidwalden (NW)" },
  { id: "OW", label: "Obwalden (OW)" },
  { id: "AI", label: "Appenzell Innerrhoden (AI)" },
  { id: "AR", label: "Appenzell Ausserrhoden (AR)" },
] as const;

export function Address({ data, patch, back, next }: ScreenProps) {
  const { isMobile } = useMediaQuery();

  return (
    <>
      <Header />

      <Section padding={isMobile ? "800" : "1200"}>
        <div className="ob4-narrow">
          <Flex direction="column" gap="800">
            <StepProgress step={2} />

            <TextTitlePage>Where do you live?</TextTitlePage>
            <TextSubtitle>
              We currently open accounts for Swiss residents only
            </TextSubtitle>

            {/* Info notice */}
            <div className="ob4-notice-info">
              <Flex direction="column" gap="100">
                <TextStrong>Swiss residential address required</TextStrong>
                <TextSmall>
                  If you recently moved to Switzerland, make sure your address
                  matches your current residence permit
                </TextSmall>
              </Flex>
            </div>

            {/* Country (locked) */}
            <SelectField
              label="Switzerland"
              description="Only Swiss residents are eligible at this time."
              isDisabled
              selectedKey="CH"
              onSelectionChange={() => {}}
            >
              <SelectItem id="CH">Switzerland</SelectItem>
            </SelectField>

            <InputField
              label="Street address"
              placeholder="Bahnhofstrasse 12"
              isRequired
              value={data.street}
              onChange={(v) => patch({ street: v })}
            />

            <InputField
              label="Apartment, suite, unit (optional)"
              placeholder="3rd floor, flat 8"
              value={data.apartment}
              onChange={(v) => patch({ apartment: v })}
            />

            {/* City + Canton + Postcode row */}
            <Flex direction={isMobile ? "column" : "row"} gap="400">
              <FlexItem size="fill">
                <InputField
                  label="City / Town"
                  placeholder="Zurich"
                  isRequired
                  value={data.city}
                  onChange={(v) => patch({ city: v })}
                />
              </FlexItem>
              <FlexItem size="fill">
                <SelectField
                  label="Canton"
                  selectedKey={data.canton || undefined}
                  onSelectionChange={(k) => patch({ canton: String(k) })}
                  placeholder="Select…"
                >
                  {CANTONS.map(({ id, label }) => (
                    <SelectItem key={id} id={id}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectField>
              </FlexItem>
              <FlexItem size="minor">
                <InputField
                  label="Postcode"
                  placeholder="8001"
                  isRequired
                  value={data.postcode}
                  onChange={(v) => patch({ postcode: v })}
                />
              </FlexItem>
            </Flex>

            <SelectField
              label="Duration"
              selectedKey={data.residenceDuration || undefined}
              onSelectionChange={(k) =>
                patch({ residenceDuration: String(k) })
              }
              placeholder="Select duration…"
            >
              <SelectItem id="lt1">Less than 1 year</SelectItem>
              <SelectItem id="1-2">1 – 2 years</SelectItem>
              <SelectItem id="3-5">3 – 5 years</SelectItem>
              <SelectItem id="gt5">More than 5 years</SelectItem>
            </SelectField>

            {/* Actions */}
            <Flex
              direction="row"
              alignSecondary="center"
              style={{ paddingTop: "var(--sds-size-space-800)" }}
            >
              <Button variant="neutral" onPress={back}>
                Back
              </Button>
              <div style={{ flex: "1 0 0" }} />
              <Button variant="primary" onPress={next}>
                Continue
              </Button>
            </Flex>
          </Flex>
        </div>
      </Section>

      <Footer />
    </>
  );
}
