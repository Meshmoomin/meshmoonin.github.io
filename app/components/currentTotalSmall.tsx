import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { commonStyles } from "@/app/styles/commonStyles";

interface CurrentTotalSmallProps {
  currentTotal: number;
}

const CurrentTotalSmall: React.FC<CurrentTotalSmallProps> = ({
  currentTotal,
}) => {
  return (
    <View style={styles.totalBox}>
      <Text style={[styles.totalText, commonStyles.lightGrey]}>Betrag:</Text>
      <Text style={styles.totalText}>{currentTotal.toFixed(2)}€</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 30,
  },
});
export default CurrentTotalSmall;
