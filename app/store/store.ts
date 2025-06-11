import { create } from "zustand";
import { SCENARIOS, FORMATS, PRICES, FIELDS } from "@/app/constants";
// Define your answer fields (string IDs)
const initialAnswers: Record<string, string | number> = {
  participantID: "0000",

  // Questionnaire fields
  ...Object.fromEntries(
    Array.from({ length: 26 }, (_, i) => [`OptionsUEQ${i + 1}`, "NA"])
  ),
  ...Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [`OptionsSUS${i + 1}`, "NA"])
  ),
  ...Object.fromEntries(
    Array.from({ length: 26 }, (_, i) => [`RoundingUEQ${i + 1}`, "NA"])
  ),
  ...Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => [`RoundingSUS${i + 1}`, "NA"])
  ),

  // Scenario answer fields
  ...(() => {
    const entries: [string, string][] = [];
    for (const scenario of SCENARIOS) {
      for (const format of FORMATS) {
        for (const price of PRICES) {
          for (const field of FIELDS) {
            entries.push([`${scenario}${format}${price}${field}`, "NA"]);
          }
        }
      }
    }
    return Object.fromEntries(entries);
  })(),
};

type ScenarioState = {
  currentTrial: number;
  completedTrials: number[];
  currentTotal: number;
  tippedTotal: number;
  nextParticipantID: number;
  useDummyID: boolean;
  answers: Record<string, string | number>;
  scenarioFLow: { interfaceType: string; format: string; total: number }[];
  answerIdentifier: string;
  // Actions
  setIdentifier: (identifier: string) => void;
  setAnswer: (id: string, value: string | number) => void;
  resetAnswers: () => void;
  setParticipantID: (id: number) => void;
  storeScenarioFlow: (
    flow: { interfaceType: string; format: string; total: number }[]
  ) => void;

  setUseDummyID: (value: boolean) => void;
  nextScenario: () => void;
  setScenario: (id: number) => void;

  markCompleted: () => void;
  incrementParticipantID: (id: number) => void;
  setTotal: (total: number) => void;
  setTippedTotal: (total: number) => void;
};

export const useScenarioStore = create<ScenarioState>((set) => ({
  currentTrial: 0,
  completedTrials: [],
  currentTotal: 0,
  tippedTotal: 0,
  nextParticipantID: 1,
  useDummyID: false,
  answers: { ...initialAnswers },
  scenarioFLow: [],
  answerIdentifier: "",
  setIdentifier: (identifier) => set({ answerIdentifier: identifier }),
  storeScenarioFlow(flow) {
    set({ scenarioFLow: flow });
  },
  setAnswer: (id, value) =>
    set((state) => ({
      answers: { ...state.answers, [id]: value },
    })),
  resetAnswers: () => set({ answers: { ...initialAnswers } }),
  setUseDummyID: (value) => set({ useDummyID: value }),
  setParticipantID: (id) => set({ nextParticipantID: id }),
  incrementParticipantID: (id) => set({ nextParticipantID: id }),
  setTippedTotal: (total) => set({ tippedTotal: total }),
  setTotal: (total) => set({ currentTotal: total }),
  nextScenario: () =>
    set((state) => ({
      currentTrial: state.currentTrial + 1,
    })),
  setScenario: (id) => set({ currentTrial: id }),
  markCompleted: () =>
    set((state) => ({
      completedTrials: [...state.completedTrials, state.currentTrial],
    })),
}));
