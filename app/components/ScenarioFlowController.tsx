import * as React from "react";
import { useScenarioStore } from "@/app/store/store";
import ScenarioRouter from "./ScenarioRouter";
import SystemUsabilityScale from "@/app/screens/followUp/systemUsabilityScale";
import SurveyComplete from "@/app/screens/SurveyComplete";

export default function ScenarioFlowController() {
  const { currentScenario, scenarioFLow } = useScenarioStore();

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
  // Default: show scenario
  return <ScenarioRouter />;
}
