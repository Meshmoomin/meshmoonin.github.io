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

export default function UniversalScenario() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { currentTotal, markCompleted, setTippedTotal, setTipSelectionLog } =
    useScenarioStore();
  var scenario: number = 0;

  const handleTipSelect = (value: number) => {
    var currentTippedTotal = currentTotal + value;
    setTippedTotal(currentTippedTotal); // Update Zustand store with the new total
    setTipSelectionLog(
      "TippedTotal, " +
        currentTippedTotal +
        ", TipPercentage, " +
        ((currentTippedTotal - currentTotal) / currentTotal).toFixed(2) +
        ", "
    ); // save data for csv
    //console.log("TippedTotal: " + currentTippedTotal + ", "); // log for debugging
    markCompleted(); // Update Zustand store
    navigation.navigate("Payment"); // Direct transition
  };

  const optionsInterface = (
    <OptionsInterfaceComp
      currentTotal={currentTotal}
      onTipSelect={handleTipSelect}
    />
  );
  const roundingInterface = (
    <RoundingInterfaceComp
      currentTotal={currentTotal}
      onTipSelect={handleTipSelect}
    />
  );
  var selectedScenario = null;
  if (scenario === 0) {
    selectedScenario = optionsInterface;
  } else if (scenario === 1) {
    selectedScenario = roundingInterface;
  } else {
    selectedScenario = <Text> Scenario not found</Text>;
  }

  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      {/* Back Button */}
      <BackButton />
      {/* Inserted Scenario */}
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
