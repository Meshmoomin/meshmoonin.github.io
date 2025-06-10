import * as React from "react";
import { useScenarioStore } from "@/app/store/store";
import ScenarioRouter from "./ScenarioRouter";
import SystemUsabilityScale from "@/app/screens/followUp/systemUsabilityScale";
import SurveyComplete from "@/app/screens/SurveyComplete";
import ScenarioDescription from "@/app/screens/scenarios/scenarioDescription";

export default function ScenarioFlowController() {
  const { currentTrial: currentScenario, scenarioFLow } = useScenarioStore();

  const scenarioParams = scenarioFLow[currentScenario];
  console.log(scenarioParams); // Debugging: Log the current scenario parameters
  if (!scenarioParams) {
    console.error(
      "No scenario parameters found for currentScenario:",
      currentScenario
    );
    return <SurveyComplete />; // Handle the case where no scenario parameters are found
  }
  if (scenarioParams.interfaceType === "followUp") {
    return <SystemUsabilityScale />;
  }
  if (scenarioParams.interfaceType === "surveyEnd") {
    return <SurveyComplete />;
  }
  if (scenarioParams.interfaceType === "description") {
    return <ScenarioDescription total={scenarioParams.total} />;
  }
  // Default: show scenario
  return <ScenarioRouter />;
}
