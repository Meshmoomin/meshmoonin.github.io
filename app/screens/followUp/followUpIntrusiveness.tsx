import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import LabeledScaleOption from "@/app/components/labeledScaleOption";

import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { useCustomBackHandler } from "@/app/hooks/backHandler";
import { commonStyles } from "@/app/styles/commonStyles";

export default function FollowUpComplexity() {
  const navigation = useNavigation<ScreenNavigationProp>();
  useCustomBackHandler(() => true); // Returning `true` disables the back button

  const { setLogMessage } = useScenarioStore();

  const handleOptionSelect = (value: number) => {
    setLogMessage("FollowUpIntrusiveness, " + value + ", "); // save data for csv
    navigation.navigate("TrialComplete");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        Wie <Text style={styles.boldText}>aufdringlich</Text> fanden Sie den
        Bezahlprozess?
      </Text>

      <View style={styles.optionsContainer}>
        {[
          { label: "Sehr aufdringlich", value: 5 },
          { label: "", value: 4 },
          { label: "", value: 3 },
          { label: "", value: 2 },
          { label: "Nicht aufdringlich", value: 1 },
        ].map((option) => (
          <Pressable
            key={option.value}
            style={({ pressed }) => [
              styles.optionPressable,
              pressed && commonStyles.buttonPressed,
            ]}
            onPress={() => handleOptionSelect(option.value)}
          >
            <View style={styles.optionRow}>
              <Text style={styles.optionLabel}>{option.label}</Text>
              <LabeledScaleOption optionText={option.value.toString()} />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  questionText: {
    fontSize: 32,
    color: "#4F4F4F",
    textAlign: "center",
    fontFamily: "Roboto",
    lineHeight: 38,
    marginBottom: 40,
    maxWidth: "90%",
  },
  boldText: {
    fontWeight: "bold",
  },
  optionsContainer: {
    alignItems: "center",
    width: "100%",
  },
  optionPressable: {
    width: "100%",
    maxWidth: 300,
    marginVertical: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the row
    gap: 16,
    maxWidth: "80%", // Constrain overall width
  },
  optionLabel: {
    color: "#787878", // Your original label color
    fontFamily: "Roboto",
    fontSize: 22,
    lineHeight: 28,
    textAlign: "right",
    width: 140, // Increased width
    paddingRight: 12,
    flexWrap: "wrap",
    includeFontPadding: false, // Prevents extra line spacing
  },
});
