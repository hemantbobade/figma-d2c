import { AllProviders } from "data";
import { Onboarding } from "./onboarding/Onboarding";
import { Onboarding2 } from "./onboarding2/Onboarding2";
import { Onboarding3 } from "./onboarding3/Onboarding3";
import { Onboarding4 } from "./onboarding4/Onboarding4";

/**
 * Toggle FLOW to switch between onboarding implementations:
 *   "v1" → src/onboarding/   (original)
 *   "v2" → src/onboarding2/  (second pass)
 *   "v3" → src/onboarding3/  (fresh from Figma, ob3- prefix)
 *   "v4" → src/onboarding4/  (fresh from Figma via get_design_context, ob4- prefix)
 */
const FLOW: "v1" | "v2" | "v3" | "v4" = "v4";

function App() {
  return (
    <AllProviders>
      {FLOW === "v4" ? (
        <Onboarding4 />
      ) : FLOW === "v3" ? (
        <Onboarding3 />
      ) : FLOW === "v2" ? (
        <Onboarding2 />
      ) : (
        <Onboarding />
      )}
    </AllProviders>
  );
}

export default App;
