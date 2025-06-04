import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Scenario: undefined;
  Payment: undefined;
  TrialComplete: undefined;
  SurveyComplete: undefined;
  UniversalScenario: undefined;
  SystemUsabilityScale: undefined;
  UserExperienceQuestionnaire: undefined;
  UniversalFollowUp: undefined;
};

// Type for useNavigation hook
export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
