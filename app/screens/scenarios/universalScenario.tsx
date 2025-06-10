import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { commonStyles } from "@/app/styles/commonStyles";
import RoundingInterfaceComp from "@/app/components/roundingInterfaceComp";
import OptionsInterfaceComp from "@/app/components/optionsInterfaceComp";

interface UniversalScenarioProps {
  interfaceType: string; // e.g., "options" or "rounding"
  format: string; // e.g., "sumRound", "sumFixed", "Fixed", "Percent"
  total: number; // e.g., 5.15, 10.3, 16.55
}

export default function UniversalScenario({
  interfaceType,
  format,
  total,
}: UniversalScenarioProps) {
  const navigation = useNavigation<ScreenNavigationProp>();
  const {
    nextParticipantID,
    markCompleted,
    setTippedTotal,
    setAnswer,
    nextScenario,
    setIdentifier,
  } = useScenarioStore();

  // Use the passed-in total instead of currentTotal from store
  const currentTotal = total;

  // Use the passed-in interfaceType to select scenario
  const scenarioName =
    interfaceType === "options"
      ? "Options"
      : interfaceType === "rounding"
        ? "Rounding"
        : "Unknown";

  const handleTipSelect = (value: number) => {
    const currentTippedTotal = value;
    const tipPercentage = (currentTippedTotal - currentTotal) / currentTotal;
    const totalCents = currentTotal * 100;
    const interfaceScenario =
      interfaceType === "options" ? "Options" : "Rounding";
    var identifier: string = interfaceScenario + format + totalCents;

    setIdentifier(identifier);
    setTippedTotal(currentTippedTotal);

    // --- Answer tracking ---
    setAnswer("participantID", nextParticipantID);
    setAnswer(identifier + "Tipped", currentTippedTotal);
    setAnswer(identifier + "Percent", tipPercentage);
    // setAnswer("optionFormat", ...); // implement later

    markCompleted();
    //navigation.navigate("Payment"); //disabled for testing TODO reenable
    nextScenario();
    navigation.navigate("UniversalFollowUp"); //Shortcut for testing only
  };

  // Select interface based on interfaceType
  let selectedScenario = null;
  if (interfaceType === "options") {
    selectedScenario = (
      <OptionsInterfaceComp
        currentTotal={currentTotal}
        format={format}
        onTipSelect={handleTipSelect}
      />
    );
  } else if (interfaceType === "rounding") {
    selectedScenario = (
      <RoundingInterfaceComp
        currentTotal={currentTotal}
        format={format}
        onTipSelect={handleTipSelect}
      />
    );
  } else {
    selectedScenario = <Text>Scenario not found</Text>;
  }

  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      {selectedScenario}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "space-between",
  },
  centerFlexColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  tipText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4f4f4f",
    textAlign: "center",
  },
});
