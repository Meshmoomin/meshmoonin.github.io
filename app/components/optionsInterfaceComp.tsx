import * as React from "react";
import { Text, StyleSheet, View, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Cancel from "@/assets/Icons/CancelCircle";
import { commonStyles } from "@/app/styles/commonStyles";
import CurrentTotalLarge from "@/app/components/currentTotalLarge";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = Math.min(SCREEN_WIDTH / 375, SCREEN_HEIGHT / 667, 1.2); // iPhone SE base

// Define your tip options at the top of the component or file
const tipOptions = [
  { label: "0.50€", value: 0.5 },
  { label: "1.00€", value: 1.0 },
  { label: "1.50€", value: 1.5 },
  { label: "2.00€", value: 2.0 },
];

interface RoundingInterfaceCompProps {
  currentTotal: number; // Pass currentTotal as a prop
  onTipSelect: (value: number) => void; // Pass up selected tip
}

const OptionsInterfaceComp: React.FC<RoundingInterfaceCompProps> = ({
  currentTotal,
  onTipSelect,
}) => {
  const handleTipSelect = (value: number) => {
    onTipSelect(value); // Call the passed function to handle tip selection
  };

  // Split tip options into two rows
  const firstRow = tipOptions.slice(0, 2);
  const secondRow = tipOptions.slice(2, 4);

  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      {/* Main Content */}
      <View style={styles.centerFlexColumn}>
        {/* Large Current Total Display */}
        <CurrentTotalLarge currentTotal={currentTotal} />

        {/* Tip Options */}
        <View style={styles.tipOptionsSection}>
          {/* First row */}
          <View style={styles.tipOptionsRow}>
            {firstRow.map((option) => (
              <Pressable
                key={option.value}
                style={({ pressed }) => [
                  styles.tipOption,
                  commonStyles.shadowBox,
                  pressed && commonStyles.buttonPressed,
                ]}
                onPress={() => handleTipSelect(option.value)}
              >
                <Text style={styles.tipText}>{option.label}</Text>
              </Pressable>
            ))}
          </View>
          {/* Second row */}
          <View style={styles.tipOptionsRow}>
            {secondRow.map((option) => (
              <Pressable
                key={option.value}
                style={({ pressed }) => [
                  styles.tipOption,
                  commonStyles.shadowBox,
                  pressed && commonStyles.buttonPressed,
                ]}
                onPress={() => handleTipSelect(option.value)}
              >
                <Text style={styles.tipText}>{option.label}</Text>
              </Pressable>
            ))}
          </View>
          {/* No tip button row */}
          <Pressable
            style={({ pressed }) => [
              styles.noTipButton,
              commonStyles.shadowBox,
              pressed && commonStyles.buttonPressed,
            ]}
            onPress={() => handleTipSelect(0)}
          >
            <Cancel width={38 * scale} height={38 * scale} />
            <Text style={styles.noTipText}>Kein Trinkgeld</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingBottom: 20 * scale,
    paddingHorizontal: 16 * scale,
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
    marginBottom: 24 * scale,
    marginHorizontal: 10 * scale,
    padding: 20 * scale,
    width: "100%",
  },
  tipOptionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20 * scale,
    marginBottom: 16 * scale,
    width: "100%",
  },
  tipOption: {
    flex: 1,
    borderRadius: 28 * scale,
    paddingVertical: 30 * scale,
    paddingHorizontal: 8 * scale,
    minWidth: 80 * scale,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tipText: {
    fontSize: 24 * scale,
    fontWeight: "600",
    color: "#4f4f4f",
    textAlign: "center",
  },
  noTipButton: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28 * scale,
    paddingVertical: 30 * scale,
    paddingHorizontal: 24 * scale,
    /*     marginVertical: 20 * scale,
     */ backgroundColor: "#fff",
  },
  noTipText: {
    fontSize: 18 * scale,
    fontWeight: "500",
    color: "#4f4f4f",
    marginLeft: 8 * scale,
  },
});
export default OptionsInterfaceComp;
