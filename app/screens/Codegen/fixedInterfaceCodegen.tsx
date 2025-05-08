import * as React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Cancel from "@/assets/Icons/CancelCircle";
import { commonStyles } from "@/app/styles/commonStyles";

const TipScreenAbsoluteValues = () => {
  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={[commonStyles.backButton, styles.backButton]}>
          {/* Replace with your actual icon if needed */}
          <Text style={commonStyles.cancelButtonText}>{"<"}</Text>
          <Text style={[styles.label, commonStyles.textSmall]}>Zurück</Text>
        </Pressable>
      </View>

      {/* Betrag */}
      <View style={styles.amountSection}>
        <Text style={[commonStyles.textLarge, commonStyles.lightGrey]}>
          Betrag:
        </Text>
        <View style={styles.amountRow}>
          <Text style={[commonStyles.textLarge, commonStyles.lightGrey]}>
            3.20
          </Text>
          <Text style={[commonStyles.textLarge, commonStyles.lightGrey]}>
            €
          </Text>
        </View>
      </View>

      {/* Tip Options */}
      <View style={styles.tipOptionsSection}>
        <View style={styles.tipOptionsRow}>
          <Pressable style={[styles.tipOption, commonStyles.shadowBox]}>
            <Text style={styles.tipText}>0,50€</Text>
          </Pressable>
          <Pressable style={[styles.tipOption, commonStyles.shadowBox]}>
            <Text style={styles.tipText}>1,00€</Text>
          </Pressable>
          <Pressable style={[styles.tipOption, commonStyles.shadowBox]}>
            <Text style={styles.tipText}>2,00€</Text>
          </Pressable>
        </View>
        <Pressable style={[styles.noTipButton, commonStyles.shadowBox]}>
          <Cancel width={38} height={38} />
          <Text style={styles.noTipText}>Kein Tip</Text>
        </Pressable>
      </View>

      {/* Aktueller Betrag */}
      <View style={styles.currentAmountSection}>
        <Text style={styles.currentAmountText}>3.20</Text>
        <Text style={styles.currentAmountText}>€</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  label: {
    marginLeft: 8,
    color: "#49454f",
  },
  amountSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  tipOptionsSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  tipOptionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 16,
  },
  tipOption: {
    borderRadius: 28,
    paddingVertical: 24,
    paddingHorizontal: 20,
    minWidth: 80,
    alignItems: "center",
    marginHorizontal: 4,
  },
  tipText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#4f4f4f",
    textAlign: "center",
  },
  noTipButton: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  noTipText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#4f4f4f",
    marginLeft: 8,
  },
  currentAmountSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 32,
  },
  currentAmountText: {
    fontSize: 64,
    fontWeight: "700",
    color: "#1f1f1f",
    textAlign: "center",
    marginHorizontal: 4,
  },
});

export default TipScreenAbsoluteValues;
