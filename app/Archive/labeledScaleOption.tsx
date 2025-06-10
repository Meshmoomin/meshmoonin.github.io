import * as React from "react";
import { Text, StyleSheet, View } from "react-native";

interface LabeledScaleOptionProps {
  optionText: string; // Define the type for the text prop
}

export default function LabeledScaleOption({
  optionText,
}: LabeledScaleOptionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.stateLayer}>
        <Text style={styles.optionText}>{optionText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 94,
    height: 94,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 28,
    backgroundColor: "#ECE6F0",
  },
  optionText: {
    width: 41,
    height: 33,
    justifyContent: "center",
    color: "#4F4F4F",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
  },
  stateLayer: {
    flexDirection: "row",
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
    columnGap: 10,
  },
});
