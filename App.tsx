import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";

import ScenarioRouter from "@/app/components/ScenarioRouter";
import ScenarioFlowController from "@/app/components/ScenarioFlowController";
import TerminalView from "./app/components/TerminalView";
import PaymentScreenNew from "@/app/screens/PaymentScreen";
import TrialComplete from "@/app/screens/TrialComplete";
import SurveyComplete from "@/app/screens/SurveyComplete";
import IDEntry from "@/app/screens/IDEntry";
import { View } from "react-native";
import { useScenarioStore } from "./app/store/store";
import UniversalScenario from "./app/screens/scenarios/universalScenario";
import SystemUsabilityScale from "./app/screens/followUp/systemUsabilityScale";
import UserExperienceQuestionnaire from "./app/screens/followUp/userExperienceQuestionnaire";
import UniversalFollowUp from "./app/screens/followUp/universalFollowUp";

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
            <Stack.Screen name="IDEntry" component={IDEntry} />
            <Stack.Screen
              name="FlowController"
              component={ScenarioFlowController}
            />
            <Stack.Screen name="UniversalScenario" component={ScenarioRouter} />
            <Stack.Screen
              name="SystemUsabilityScale"
              component={SystemUsabilityScale}
            />
            <Stack.Screen
              name="UserExperienceQuestionnaire"
              component={UserExperienceQuestionnaire}
            />
            <Stack.Screen
              name="UniversalFollowUp"
              component={UniversalFollowUp}
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
