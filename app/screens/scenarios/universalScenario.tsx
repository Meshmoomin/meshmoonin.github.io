import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { commonStyles } from "@/app/styles/commonStyles";
import BackButton from "@/app/components/backButton";
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
    const currentTippedTotal = currentTotal + value;
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
        onTipSelect={handleTipSelect}
      />
    );
  } else if (interfaceType === "rounding") {
    selectedScenario = (
      <RoundingInterfaceComp
        currentTotal={currentTotal}
        onTipSelect={handleTipSelect}
      />
    );
  } else {
    selectedScenario = <Text>Scenario not found</Text>;
  }

  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      <BackButton />
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
  tipOptionsSection: {
    flex: 2,
    alignItems: "center",
    marginBottom: 24,
    marginHorizontal: 10,
    padding: 20,
  },
  tipOptionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 16,
  },
  tipOption: {
    flex: 1,
    borderRadius: 28,
    paddingVertical: 30,
    paddingHorizontal: 12,
    minWidth: 80,
    alignItems: "center",
    marginHorizontal: 0,
  },
  tipText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4f4f4f",
    textAlign: "center",
  },
  noTipButton: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    paddingVertical: 30,
    paddingHorizontal: 24,
    marginVertical: 20,
  },
  noTipText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4f4f4f",
    marginLeft: 8,
  },
});
