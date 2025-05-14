import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useScenarioStore } from "@/app/store/store";
import { ScreenNavigationProp } from "@/types/navigation";
import { commonStyles } from "@/app/styles/commonStyles";
import { useTipRounding } from "@/app/hooks/tipRounding";
import RoundingCarousel from "@/app/components/flatListCarousel";

import OkChevron from "@/assets/Icons/OkChevron";
import BackButton from "@/app/components/backButton";

export default function Scenario1() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { currentTotal, markCompleted, setTippedTotal, setTipSelectionLog } =
    useScenarioStore();

  const [currentTippedTotal, setCurrentTippedTotal] =
    React.useState(currentTotal); // Read currentTotal from totalEntry
  const values = useTipRounding(currentTotal); //[5.0, 4.5, 4.0, 3.5, 3.2]; // replace with algorithm

  const handleComplete = () => {
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
    <View style={commonStyles.fullScreen}>
      <BackButton />

      <View style={styles.centerFlexColumn}>
        <View style={styles.totalBox}>
          <Text style={[styles.totalText, commonStyles.lightGrey]}>
            Betrag:
          </Text>
          <Text style={styles.totalText}>{currentTotal.toFixed(2)}€</Text>
        </View>

        <View style={styles.carouselBox}>
          <RoundingCarousel
            values={values}
            currentTotal={currentTotal}
            onChange={setCurrentTippedTotal}
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
    </View>
  );
}

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
  totalText: {
    fontSize: 28,
    lineHeight: 40,
    fontWeight: 500,
    fontFamily: "Roboto",
    color: "#afafaf",
    textAlign: "center",
  },
  totalBox: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  okButtonText: {
    fontSize: 45,
    fontFamily: "Roboto-Regular",
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
