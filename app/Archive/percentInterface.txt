import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import Cancel from "@/assets/Icons/CancelCircle";
import { commonStyles } from "@/app/styles/commonStyles";
import BackButton from "@/app/components/backButton";
import CurrentTotalLarge from "@/app/components/currentTotalLarge";

// Define your tip options at the top of the component or file
const tipOptions = [
  { label: "5%", value: 0.05 },
  { label: "10%", value: 0.1 },
  { label: "15%", value: 0.15 },
  { label: "20%", value: 0.2 },
];

export default function PercentInterface() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { currentTotal, markCompleted, setTippedTotal, setTipSelectionLog } =
    useScenarioStore();

  const handleTipSelect = (value: number) => {
    var currentTippedTotal = currentTotal * (1 + value);
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
  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      <BackButton />

      {/* Main Content */}
      <View style={styles.centerFlexColumn}>
        {/* Aktueller Betrag */}
        <CurrentTotalLarge currentTotal={currentTotal} />

        {/* Tip Options */}
        <View style={styles.tipOptionsSection}>
          <View style={styles.tipOptionsRow}>
            {tipOptions.map((option) => (
              <Pressable
                key={option.value}
                style={({ pressed }) => [
                  styles.tipOption,
                  commonStyles.shadowBox,
                  pressed && commonStyles.buttonPressed,
                ]}
                onPress={() => handleTipSelect(option.value)} // Add your handler here
              >
                <Text style={styles.tipText}>{option.label}</Text>
                <Text style={styles.tipAbsText}>
                  {(currentTotal * option.value).toFixed(2)}€
                </Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.noTipButton,
              commonStyles.shadowBox,
              pressed && commonStyles.buttonPressed,
            ]}
            onPress={() => handleTipSelect(0)}
          >
            <Cancel width={38} height={38} />
            <Text style={styles.noTipText}>Kein Trinkgeld</Text>
          </Pressable>
        </View>
      </View>
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
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 20,
    marginBottom: 16,
  },
  tipOption: {
    width: "46%",
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
  tipAbsText: {
    fontSize: 16,
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
