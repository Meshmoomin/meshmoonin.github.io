import * as React from "react";
import { useScenarioStore } from "@/app/store/store";
import UniversalScenario from "@/app/screens/scenarios/universalScenario";

export default function ScenarioRouter() {
  const { currentTrial: currentScenario, scenarioFLow } = useScenarioStore();

  // Get the full order of scenarios
  // Get the current scenario's parameters
  const scenarioParams = scenarioFLow[currentScenario] || scenarioFLow[0];

  // Pass the info as props
  return (
    <UniversalScenario
      interfaceType={scenarioParams.interfaceType}
      format={scenarioParams.format}
      total={scenarioParams.total}
    />
  );
}
