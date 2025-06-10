import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { useCustomBackHandler } from "@/app/hooks/backHandler";
import { commonStyles } from "@/app/styles/commonStyles";

export default function SystemUsabilityScale() {
  const navigation = useNavigation<ScreenNavigationProp>();
  useCustomBackHandler(() => true);

  const { answerIdentifier, setAnswer } = useScenarioStore();

  const susQuestions = [
    {
      id: "SUS1",
      text: "Ich kann mir sehr gut vorstellen, das System regelmäßig zu nutzen.",
    },
    { id: "SUS2", text: "Ich finde das System unnötig komplex." },
    { id: "SUS3", text: "Ich finde das System einfach zu nutzen." },
    {
      id: "SUS4",
      text: "Ich denke, dass ich technischen Support brauchen würde, um das System zu nutzen.",
    },
    {
      id: "SUS5",
      text: "Ich finde, dass die verschiedenen Funktionen des Systems gut integriert sind.",
    },
    {
      id: "SUS6",
      text: "Ich finde, dass es im System zu viele Inkonsistenzen gibt.",
    },
    {
      id: "SUS7",
      text: "Ich kann mir vorstellen, dass die meisten Leute das System schnell zu beherrschen lernen.",
    },
    { id: "SUS8", text: "Ich empfinde die Bedienung als sehr umständlich." },
    {
      id: "SUS9",
      text: "Ich habe mich bei der Nutzung des Systems sehr sicher gefühlt.",
    },
    {
      id: "SUS10",
      text: "Ich musste eine Menge Dinge lernen, bevor ich mit dem System arbeiten konnte.",
    },
  ];

  // Track answers by string question id
  const [answers, setAnswers] = React.useState<Record<string, number>>({});

  const handleRadioSelect = (questionId: string, value: number) => {
    const scenario =
      answerIdentifier.charAt(0) === "R" ? "Rounding" : "Options";
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setAnswer(scenario + questionId, value); // Save answer in Zustand store
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {susQuestions.map((question) => (
        <View key={question.id} style={styles.questionBlock}>
          <Text style={styles.questionText}>{question.text}</Text>
          {/* Labels above the radio row */}
          <View style={styles.labelsRow}>
            <Text style={styles.sliderLabel}>Stimme nicht zu</Text>
            <Text style={styles.sliderLabel}>Stimme voll zu</Text>
          </View>
          {/* Radio buttons row */}
          <View style={styles.radioRow}>
            {[1, 2, 3, 4, 5].map((val) => (
              <Pressable
                key={val}
                style={[
                  styles.radioOuter,
                  answers[question.id] === val && styles.radioOuterSelected,
                ]}
                onPress={() => handleRadioSelect(question.id, val)}
              >
                {answers[question.id] === val && (
                  <View style={styles.radioInner} />
                )}
              </Pressable>
            ))}
          </View>
          {/* Numbers below the radio buttons */}
          <View style={styles.numbersRow}>
            {[1, 2, 3, 4, 5].map((val) => (
              <Text
                key={val}
                style={[
                  styles.gradation,
                  answers[question.id] === val && styles.selectedGradation,
                ]}
              >
                {val}
              </Text>
            ))}
          </View>
        </View>
      ))}
      <Pressable
        style={({ pressed }) => [
          commonStyles.confirmButtonPressable,
          commonStyles.confirmButtonGreen,
          pressed && commonStyles.buttonPressed,
        ]}
        onPress={() => navigation.navigate("UserExperienceQuestionnaire")}
      >
        <Text style={commonStyles.confirmButtonText}>Weiter</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  questionBlock: {
    marginBottom: 32,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: "100%",
    shadowColor: "rgba(0,0,0,0.05)",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 20,
    color: "#4F4F4F",
    textAlign: "center",
    fontFamily: "Roboto",
    lineHeight: 28,
    marginBottom: 16,
    maxWidth: "100%",
  },
  labelsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#4F4F4F",
    fontFamily: "Roboto",
    width: 100,
    textAlign: "center",
  },
  radioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  radioOuter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#AFAFAF",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  radioOuterSelected: {
    borderColor: "#4F4F4F",
    backgroundColor: "#C1DFCD",
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4F4F4F",
  },
  numbersRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 2,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  gradation: {
    fontSize: 14,
    color: "#AFAFAF",
    width: 24,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  selectedGradation: {
    color: "#4F4F4F",
    fontWeight: "bold",
  },
  okButton: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
});
