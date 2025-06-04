import * as React from "react";
import { Text, StyleSheet, View, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { useCustomBackHandler } from "@/app/hooks/backHandler";
import { commonStyles } from "@/app/styles/commonStyles";

export default function UserExperienceQuestionnaire() {
  const navigation = useNavigation<ScreenNavigationProp>();
  useCustomBackHandler(() => true);

  const { setAnswer } = useScenarioStore();

  // Each question has custom left/right labels
  const ueQuestions = [
    { id: "UEQ1", leftLabel: "unerfreulich", rightLabel: "erfreulich" },
    { id: "UEQ2", leftLabel: "unverständlich", rightLabel: "verständlich" },
    { id: "UEQ3", leftLabel: "kreativ", rightLabel: "phantasielos" },
    {
      id: "UEQ4",
      leftLabel: "leicht zu lernen",
      rightLabel: "schwer zu lernen",
    },
    { id: "UEQ5", leftLabel: "wertvoll", rightLabel: "minderwertig" },
    { id: "UEQ6", leftLabel: "langweilig", rightLabel: "spannend" },
    { id: "UEQ7", leftLabel: "uninteressant", rightLabel: "interessant" },
    { id: "UEQ8", leftLabel: "unberechenbar", rightLabel: "voraussagbar" },
    { id: "UEQ9", leftLabel: "schnell", rightLabel: "langsam" },
    { id: "UEQ10", leftLabel: "originell", rightLabel: "konventionell" },
    { id: "UEQ11", leftLabel: "behindernd", rightLabel: "unterstützend" },
    { id: "UEQ12", leftLabel: "gut", rightLabel: "schlecht" },
    { id: "UEQ13", leftLabel: "kompliziert", rightLabel: "einfach" },
    { id: "UEQ14", leftLabel: "abstoßend", rightLabel: "anziehend" },
    { id: "UEQ15", leftLabel: "herkömmlich", rightLabel: "neuartig" },
    { id: "UEQ16", leftLabel: "unangenehm", rightLabel: "angenehm" },
    { id: "UEQ17", leftLabel: "sicher", rightLabel: "unsicher" },
    { id: "UEQ18", leftLabel: "aktivierend", rightLabel: "einschläfernd" },
    {
      id: "UEQ19",
      leftLabel: "erwartungskonform",
      rightLabel: "nicht erwartungskonform",
    },
    { id: "UEQ20", leftLabel: "ineffizient", rightLabel: "effizient" },
    { id: "UEQ21", leftLabel: "übersichtlich", rightLabel: "verwirrend" },
    { id: "UEQ22", leftLabel: "unpragmatisch", rightLabel: "pragmatisch" },
    { id: "UEQ23", leftLabel: "aufgeräumt", rightLabel: "überladen" },
    { id: "UEQ24", leftLabel: "attraktiv", rightLabel: "unattraktiv" },
    { id: "UEQ25", leftLabel: "sympathisch", rightLabel: "unsympathisch" },
    { id: "UEQ26", leftLabel: "konservativ", rightLabel: "innovativ" },
  ];

  const ueShortQuestions = [
    { id: "UEQ1", leftLabel: "behindernd", rightLabel: "unterstützend" },
    { id: "UEQ2", leftLabel: "kompliziert", rightLabel: "einfach" },
    { id: "UEQ3", leftLabel: "ineffizient", rightLabel: "effizient" },
    { id: "UEQ4", leftLabel: "verwirrend", rightLabel: "übersichtlich" },
    { id: "UEQ5", leftLabel: "langweilig", rightLabel: "spannend" },
    { id: "UEQ6", leftLabel: "uninteressant", rightLabel: "interessant" },
    { id: "UEQ7", leftLabel: "konventionell", rightLabel: "originell" },
    { id: "UEQ8", leftLabel: "herkömmlich", rightLabel: "neuartig" },
  ];

  // Track answers by question id
  const [answers, setAnswers] = React.useState<Record<string, number>>({});

  const handleRadioSelect = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setAnswer(questionId, value); // Save answer in Zustand store
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      stickyHeaderIndices={[0]}
    >
      {/* Sticky header */}
      <View style={styles.stickyHeader}>
        <Text style={styles.stickyHeaderText}>
          Ich finde das Interface war eher ...
        </Text>
      </View>
      {ueQuestions.map((question) => (
        <View key={question.id} style={styles.questionBlock}>
          {/* Custom labels above the radio row */}
          <View style={styles.labelsRow}>
            <Text style={[styles.sliderLabel, { textAlign: "left" }]}>
              {question.leftLabel}
            </Text>
            <Text style={[styles.sliderLabel, { textAlign: "right" }]}>
              {question.rightLabel}
            </Text>
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
        onPress={() => navigation.navigate("TrialComplete")}
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
  stickyHeader: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ece6f0",
    width: "100%",
    zIndex: 10,
  },
  stickyHeaderText: {
    fontSize: 20,
    color: "#4F4F4F",
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "bold",
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
});
