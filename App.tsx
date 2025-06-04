import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";

import ScenarioRouter from "@/app/components/ScenarioRouter";
import TerminalView from "./app/components/TerminalView";
import PaymentScreenNew from "@/app/screens/PaymentScreen";
import TrialComplete from "@/app/screens/TrialComplete";
import SurveyComplete from "@/app/screens/SurveyComplete";
import { View } from "react-native";
import { initLogger } from "@/app/logger/logger";
import { useEffect } from "react";
import { useScenarioStore } from "./app/store/store";
import UniversalScenario from "./app/screens/scenarios/universalScenario";
import SystemUsabilityScale from "./app/screens/followUp/systemUsabilityScale";
import UserExperienceQuestionnaire from "./app/screens/followUp/userExperienceQuestionnaire";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const initLogFile = useScenarioStore((state) => state.initLogFile);

  React.useEffect(() => {
    initLogFile();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <TerminalView>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="UniversalScenario"
              component={UniversalScenario}
            />
            <Stack.Screen
              name="SystemUsabilityScale"
              component={SystemUsabilityScale}
            />
            <Stack.Screen
              name="UserExperienceQuestionnaire"
              component={UserExperienceQuestionnaire}
            />
            <Stack.Screen name="Payment" component={PaymentScreenNew} />
            <Stack.Screen name="TrialComplete" component={TrialComplete} />
            <Stack.Screen name="SurveyComplete" component={SurveyComplete} />
          </Stack.Navigator>
        </TerminalView>
      </NavigationContainer>
    </View>
  );
}
