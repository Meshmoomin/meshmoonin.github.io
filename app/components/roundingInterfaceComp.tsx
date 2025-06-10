import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { commonStyles } from "@/app/styles/commonStyles";
import { useTipRounding } from "@/app/hooks/tipRounding";
import RoundingCarousel from "@/app/components/flatListCarousel";
import CurrentTotalSmall from "@/app/components/currentTotalSmall";

import OkChevron from "@/assets/Icons/OkChevron";
import { SafeAreaView } from "react-native-safe-area-context";

interface RoundingInterfaceCompProps {
  currentTotal: number; // Pass currentTotal as a prop
  format: string; // e.g., "sumRound", "sumFixed", "Fixed", "Percent"
  onTipSelect: (value: number) => void; // Pass up selected tip
}

const RoundingInterfaceComp: React.FC<RoundingInterfaceCompProps> = ({
  currentTotal,
  format,
  onTipSelect,
}) => {
  const [currentTippedTotal, setCurrentTippedTotal] =
    React.useState(currentTotal); // Read currentTotal from totalEntry

  let valuesSumRound = useTipRounding(currentTotal); //
  valuesSumRound = [...valuesSumRound, currentTotal];
  let valuesFixed: number[] | string[] = [
    0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0,
  ].reverse();
  const valuesSumFixed = valuesFixed.map((value) => value + currentTotal);
  valuesFixed = valuesFixed.map((value) => value.toFixed(2));
  const valuesPercent = [
    "0%",
    "5%",
    "10%",
    "15%",
    "20%",
    "25%",
    "30%",
    "35%",
    "40%",
  ].reverse();

  let values;
  switch (format) {
    case "sumRound":
      values = valuesSumRound;
      break;
    case "sumFixed":
      values = valuesSumFixed;
      break;
    case "Fixed":
      values = valuesFixed;
      break;
    case "Percent":
      values = valuesPercent;
      break;
    default:
      console.warn("Unknown format, using default Fixed options");
      values = valuesFixed;
      break;
  }

  const handleComplete = () => {
    onTipSelect(currentTippedTotal);
  };

  return (
    <SafeAreaView style={commonStyles.fullScreen}>
      <View style={styles.centerFlexColumn}>
        <CurrentTotalSmall currentTotal={currentTotal} />

        <View style={styles.carouselBox}>
          <RoundingCarousel
            values={values}
            currentTotal={currentTotal}
            onChange={(value) => {
              if (typeof value === "string") {
                const parsed = parseFloat(value.replace("%", ""));
                // If it's a percent, calculate the tip based on currentTotal
                if (value.includes("%") && !isNaN(parsed)) {
                  setCurrentTippedTotal(
                    currentTotal + (currentTotal * parsed) / 100
                  );
                } else {
                  setCurrentTippedTotal(currentTotal + parsed);
                }
              } else {
                setCurrentTippedTotal(value);
              }
            }}
          />
        </View>

        <View style={styles.okButtonBox}>
          <Pressable
            onPress={handleComplete}
            style={({ pressed }) => [
              styles.okButton,
              styles.roudUpShadowBox,
              pressed && commonStyles.buttonPressed,
            ]}
          >
            <View style={[styles.okButtonLabel]}>
              <Text style={[styles.okButtonText, commonStyles.midGrey]}>
                OK
              </Text>
              <OkChevron style={styles.chevronIcon} width={40} height={40} />
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  baseText: {
    includeFontPadding: false,
  },
  centerFlexColumn: {
    flex: 1,
    alignItems: "center",
    margin: 20,
    marginTop: 100,
    padding: 10,
    /* borderColor: "green", // Debugging style, remove in production.
    borderWidth: 5, // Debugging style, remove in production. */
  },
  carouselBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  roudUpShadowBox: {
    minWidth: 80,
    backgroundColor: "#ece6f0",
    borderRadius: 16,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  okButtonText: {
    fontSize: 45,
    fontFamily: "Roboto",
    lineHeight: 52,
    textAlign: "center",
  },
  okButtonBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  chevronIcon: {},
  okButtonLabel: {
    flex: 0, // Default for `View`, can be removed.
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  okButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#ece6f0",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default RoundingInterfaceComp;
