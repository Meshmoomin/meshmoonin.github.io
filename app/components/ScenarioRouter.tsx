import * as React from "react";
import { useScenarioStore } from "@/app/store/store";
import UniversalScenario from "@/app/screens/scenarios/universalScenario";

// Possible values
const INTERFACE_TYPES = ["options", "rounding"] as const;
const FORMATS = ["sumRound", "sumFixed", "Fixed", "Percent"] as const;
const TOTALS = [5.15, 10.3, 14.55] as const;

// Helper for all combinations for a given interface type
function getCombinationsForInterface(interfaceType: string) {
  const combos: { interfaceType: string; format: string; total: number }[] = [];
  for (const format of FORMATS) {
    for (const total of TOTALS) {
      combos.push({ interfaceType, format, total });
    }
  }
  return combos;
}

// Shuffle utility
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ScenarioRouter() {
  const { currentScenario, nextParticipantID } = useScenarioStore();

  // Generate and shuffle orders for each interface type
  const [optionsOrder] = React.useState(() =>
    shuffle(getCombinationsForInterface("options"))
  );
  const [roundingOrder] = React.useState(() =>
    shuffle(getCombinationsForInterface("rounding"))
  );

  // Alternate which block comes first based on participant ID (even/odd)
  const isEven = nextParticipantID % 2 === 0;
  const fullOrder = isEven
    ? [...optionsOrder, ...roundingOrder]
    : [...roundingOrder, ...optionsOrder];

  // Get the current scenario's parameters
  const scenarioParams = fullOrder[currentScenario] || fullOrder[0];

  // Pass the info as props
  return (
    <UniversalScenario
      interfaceType={scenarioParams.interfaceType}
      format={scenarioParams.format}
      total={scenarioParams.total}
    />
  );
}
