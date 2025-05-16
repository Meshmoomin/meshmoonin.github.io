import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import LabeledScaleOption from "@/app/components/labeledScaleOption";

import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { useCustomBackHandler } from "@/app/hooks/backHandler";

export default function FollowUpComplexity() {
  const navigation = useNavigation<ScreenNavigationProp>();
  useCustomBackHandler(() => true); // Returning `true` disables the back button

  const { setLogMessage } = useScenarioStore();

  const handleOptionSelect = (value: number) => {
    setLogMessage("FollowUpComplexity, " + value + ", "); // save data for csv
    navigation.navigate("FollowUpIntrusiveness");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        Wie <Text style={styles.boldText}>kompliziert</Text> fanden Sie den
        Bezahlprozess?
      </Text>

      <View style={styles.optionsContainer}>
        {[
          { label: "Sehr einfach", value: 1 },
          { label: "", value: 2 },
          { label: "", value: 3 },
          { label: "", value: 4 },
          { label: "Sehr kompliziert", value: 5 },
        ].map((option) => (
          <Pressable
            key={option.value}
            style={({ pressed }) => [
              styles.optionPressable,
              pressed && styles.optionPressablePressed,
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
  optionPressablePressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
});
/*       
  return (
    <View style={styles.container}>
        <Text style={styles.questionText}>
            <Text style={styles.questionText}>Wie </Text>
            <Text style={{fontWeight: "bold"}}>kompliziert
            </Text>
            <Text style={styles.questionText}> fanden sie den Bezahlprozess?</Text>
        </Text>
      <View style={styles.buttonsLabels}>
        <View style={styles.buttons}>
            <View style={styles.labeledOption}>
                <Text style={styles.optionLabel}>
                {`Sehr Kompliziert`}
                </Text>
                <Pressable onPress={() => handleOptionSelect(5)}>
                    <LabeledScaleOption/> 
                </Pressable>
            </View>
            <LabeledScaleOption />
            <LabeledScaleOption />
            <LabeledScaleOption />
            <View style={styles.labeledOption}>
                <Text style={styles.optionLabel}>
                {`Sehr Einfach`}
                </Text>
                <LabeledScaleOption/>
            </View>
        </View>
      </View>
    </View>
  );
}

    const styles = StyleSheet.create({
        container: {
            width: 412,
            height: 892,
            paddingTop: 88.582,
            paddingLeft: 60.403,
            paddingBottom: 65,
            paddingRight: 60.403,
        },
        questionText: { 
            width: 291,
            height: 130,
            color: '#4F4F4F',
            textAlign: 'center',
            fontFamily: 'Roboto',
            fontSize: 24, // Replace with the appropriate numeric value
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 32, // Replace with the appropriate numeric value
        },
        buttonsLabels: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 10,
            columnGap: 10,
            },
        buttons: {
            height: 570,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-end',
            rowGap: 15,
            columnGap: 15,
            },
        labeledOption: {
            flexDirection: 'row',
            alignItems: 'center',
            rowGap: 20,
            columnGap: 20
        },
        optionLabel: {
            width: 135,
            alignItems: 'center',
            color: '#787878',
            textAlign: 'right',
            fontFamily: 'Roboto',
            fontSize: 22,
            fontWeight: 400,
            lineHeight: 28,
        },
            }); */
