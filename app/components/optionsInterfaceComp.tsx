import * as React from "react";
import { Text, StyleSheet, View, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Cancel from "@/assets/Icons/CancelCircle";
import { commonStyles } from "@/app/styles/commonStyles";
import CurrentTotalLarge from "@/app/components/currentTotalLarge";
import { useTipRounding } from "@/app/hooks/tipRounding"; // Assuming you have a custom hook for tip rounding

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = Math.min(SCREEN_WIDTH / 375, SCREEN_HEIGHT / 667, 1.2); // iPhone SE base

interface RoundingInterfaceCompProps {
  currentTotal: number; // Pass currentTotal as a prop
  format: string; // Optional format prop, can be used for future extensions
  onTipSelect: (value: number) => void; // Pass up selected tip
}

const OptionsInterfaceComp: React.FC<RoundingInterfaceCompProps> = ({
  currentTotal,
  format,
  onTipSelect,
}) => {
  const handleTipSelect = (value: number) => {
    onTipSelect(value); // Call the passed function to handle tip selection
  };

  const tipOptionsFixed = [
    { label: "0.50€", value: 0.5 + currentTotal },
    { label: "1.00€", value: 1.0 + currentTotal },
    { label: "1.50€", value: 1.5 + currentTotal },
    { label: "2.00€", value: 2.0 + currentTotal },
  ];
  const tipOptionsPercent = [
    { label: "5%", value: 1.05 * currentTotal },
    { label: "10%", value: 1.1 * currentTotal },
    { label: "15%", value: 1.15 * currentTotal },
    { label: "20%", value: 1.2 * currentTotal },
  ];
  const tipOptionsSumFixed = [
    { label: (0.5 + currentTotal).toFixed(2) + "€", value: 0.5 + currentTotal },
    { label: (1.0 + currentTotal).toFixed(2) + "€", value: 1.0 + currentTotal },
    { label: (1.5 + currentTotal).toFixed(2) + "€", value: 1.5 + currentTotal },
    { label: (2.0 + currentTotal).toFixed(2) + "€", value: 2.0 + currentTotal },
  ];
  const sumRoundSuggestions = useTipRounding(currentTotal).reverse();
  const tipOptionsSumRound = [
    {
      label: sumRoundSuggestions[0].toFixed(2) + "€",
      value: sumRoundSuggestions[0],
    },
    {
      label: sumRoundSuggestions[1].toFixed(2) + "€",
      value: sumRoundSuggestions[1],
    },
    {
      label: sumRoundSuggestions[2].toFixed(2) + "€",
      value: sumRoundSuggestions[2],
    },
    {
      label: sumRoundSuggestions[3].toFixed(2) + "€",
      value: sumRoundSuggestions[3],
    },
  ];

  let tipOptions;
  switch (format) {
    case "sumRound":
      tipOptions = tipOptionsSumRound;
      break;
    case "sumFixed":
      tipOptions = tipOptionsSumFixed;
      break;
    case "Fixed":
      tipOptions = tipOptionsFixed;
      break;
    case "Percent":
      tipOptions = tipOptionsPercent;
      break;
    default:
      console.warn("Unknown format, using default Fixed options");
      tipOptions = tipOptionsFixed;
      break;
  }
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
            onPress={() => handleTipSelect(currentTotal)}
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
