import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/navigation";

import AdminScreen from "@/app/screens/AdminScreen";
import ScenarioRouter from "@/app/components/ScenarioRouter";
import FollowUpGeneral from "@/app/screens/followUp/followUpGeneral";
import FollowUpComplexity from "@/app/screens/followUp/followUpComplexity";
import FollowUpIntrusiveness from "@/app/screens/followUp/followUpIntrusiveness";
import TerminalView from "./app/components/TerminalView";
import PaymentScreenNew from "@/app/screens/paymentScreen";
import TrialComplete from "@/app/screens/trialComplete";
import TotalEntry from "@/app/screens/totalEntry";
import SurveyComplete from "@/app/screens/SurveyComplete";
import { View } from "react-native";
import { initLogger } from "@/app/logger/logger";
import { useEffect } from "react";
import { useScenarioStore } from "./app/store/store";

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
              name="Admin"
              component={AdminScreen}
              options={{ headerShown: true, title: "Admin Controls" }}
            />
            <Stack.Screen
              name="Scenario"
              component={ScenarioRouter}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="FollowUpGeneral" component={FollowUpGeneral} />
            <Stack.Screen
              name="FollowUpComplexity"
              component={FollowUpComplexity}
              options={{}}
            />
            <Stack.Screen
              name="FollowUpIntrusiveness"
              component={FollowUpIntrusiveness}
            />
            <Stack.Screen name="Payment" component={PaymentScreenNew} />
            <Stack.Screen name="TrialComplete" component={TrialComplete} />
            <Stack.Screen name="totalEntry" component={TotalEntry} />
            <Stack.Screen name="SurveyComplete" component={SurveyComplete} />
            {/* Add more screens as needed */}
            {/* Example: <Stack.Screen name="AnotherScreen" component={AnotherScreen} /> */}
            {/* <Stack.Screen name="FollowUpIntrusiveness" component={FollowUpIntrusiveness} /> */}
            {/* Add more screens as needed */}
            {/* Example: <Stack.Screen name="AnotherScreen" component={AnotherScreen} /> */}
            {/* <Stack.Screen name="FollowUpIntrusiveness" component={FollowUpIntrusiveness} /> */}
            {/* Add more FollowUp screens as needed */}
          </Stack.Navigator>
        </TerminalView>
      </NavigationContainer>
    </View>
  );
}
