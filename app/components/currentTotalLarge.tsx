import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useScenarioStore } from "@/app/store/store";

interface CurrentTotalLargeProps {
  currentTotal: number;
}
const CurrentTotalLarge: React.FC<CurrentTotalLargeProps> = ({
  currentTotal,
}) => {
  return (
    <View style={styles.currentAmountSection}>
      <Text style={styles.totalLabelText}>Betrag:</Text>
      <Text style={styles.currentAmountText}>{currentTotal.toFixed(2)}€</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "space-between",
  },
  currentAmountSection: {
    flex: 1,
    justifyContent: "center",
    marginTop: "30%",
    marginBottom: "10%",
  },
  currentAmountText: {
    fontSize: 64,
    fontWeight: "700",
    color: "#1f1f1f",
    textAlign: "center",
    marginHorizontal: 4,
  },
  totalLabelText: {
    fontSize: 28,
    lineHeight: 40,
    fontWeight: "600",
    fontFamily: "Roboto",
    color: "#afafaf",
    textAlign: "center",
  },
});
export default CurrentTotalLarge;
