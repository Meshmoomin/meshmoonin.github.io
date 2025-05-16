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
  { label: "0.50€", value: 0.5 },
  { label: "1.00€", value: 1.0 },
  { label: "2.00€", value: 2.0 },
];

interface RoundingInterfaceCompProps {
  currentTotal: number; // Pass currentTotal as a prop
  onTipSelect: (value: number) => void; // Pass up selected tip
}

const OptionsInterfaceComp: React.FC<RoundingInterfaceCompProps> = ({
  currentTotal,
}) => {
  const handleTipSelect = (value: number) => {
    var currentTippedTotal = currentTotal + value;
  };
  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      {/* Back Button */}
      <BackButton />

      {/* Main Content */}
      <View style={styles.centerFlexColumn}>
        {/* Large Current Total Display */}
        <CurrentTotalLarge />

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
};
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
export default OptionsInterfaceComp;
