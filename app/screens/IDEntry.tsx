import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { commonStyles } from "@/app/styles/commonStyles";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Possible values
const INTERFACE_TYPES = ["options", "rounding"] as const;
const FORMATS = ["sumRound", "sumFixed", "Fixed", "Percent"] as const;
//const FORMATS = ["Fixed"] as const; //Reduced for faster Debugging
const TOTALS = [7.15, 10.3, 12.55] as const; //Debugging TODO reenable
//const TOTALS = [7.15, 10.3] as const;

// Helper for all combinations for a given interface type
function getCombinationsForInterface(interfaceType: string) {
  const combos: { interfaceType: string; format: string; total: number }[] = [];
  for (const format of FORMATS) {
    for (const total of TOTALS) {
      combos.push({ interfaceType, format, total });
    }
  }
  return combos;
}

// Shuffle utility
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const IDEntry = () => {
  const [amount, setAmount] = useState(""); // State to manage the large amount
  const navigation = useNavigation<ScreenNavigationProp>();
  const { setParticipantID, storeScenarioFlow } = useScenarioStore();
  const insets = useSafeAreaInsets();

  // Responsive scaling factors
  const scale = Math.min(SCREEN_WIDTH / 400, SCREEN_HEIGHT / 800, 1.2); // 1.2 is a max scale cap

  const generateScenarioOrder = (participantId: number) => {
    const followUpPlaceholder = {
      interfaceType: "followUp",
      format: "placeholder",
      total: 0,
    };
    const scenarioEndPlaceholder = {
      interfaceType: "surveyEnd",
      format: "placeholder",
      total: 0,
    };
    const descriptionStep = (passedTotal: number) => ({
      interfaceType: "description",
      format: "placeholder",
      total: passedTotal,
    });

    // Generate Blocks with shuffled order
    const optionsOrder = shuffle(getCombinationsForInterface("options"));
    const roundingOrder = shuffle(getCombinationsForInterface("rounding"));

    // Insert a description step before each scenario
    const withDescriptions = (order: typeof optionsOrder) =>
      order.flatMap((scenario) => [descriptionStep(scenario.total), scenario]);

    const optionsWithDescriptions = withDescriptions(optionsOrder);
    const roundingWithDescriptions = withDescriptions(roundingOrder);

    // Alternate which block comes first based on participant ID (even/odd)
    const isEven = participantId % 2 === 0;
    const fullOrder = isEven
      ? [
          ...optionsWithDescriptions,
          followUpPlaceholder,
          ...roundingWithDescriptions,
          followUpPlaceholder,
          scenarioEndPlaceholder,
        ]
      : [
          ...roundingWithDescriptions,
          followUpPlaceholder,
          ...optionsWithDescriptions,
          followUpPlaceholder,
          scenarioEndPlaceholder,
        ];
    return fullOrder;
  };

  const handleEnterPress = () => {
    // Handle the Enter key press
    if (amount) {
      setParticipantID(parseFloat(amount)); // Save the amount to the store
      const scenarioOrder = generateScenarioOrder(parseFloat(amount));
      storeScenarioFlow(scenarioOrder); // Store the scenario flow in Zustand
      navigation.navigate("FlowController"); // Navigate to the next screen
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      // Remove the last character
      setAmount((prev) => (prev.length > 0 ? prev.slice(0, -1) : ""));
    } else {
      // Append the key to the amount
      setAmount((prev) => (prev.length < 10 ? prev + key : prev)); // Limit to 10 characters
    }
  };

  // Keyboard layout: 4 rows of 3 buttons
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["0", "backspace", "enter"],
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.IDEntryLabel}>
        <Text style={[styles.label, { fontSize: 20 * scale }]}>
          Teilnahme ID eingeben:
        </Text>
      </View>
      <View style={styles.largeAmountContainer}>
        <Text style={[styles.largeAmount, { fontSize: 60 * scale }]}>
          {amount || "-"}
        </Text>
      </View>
      <View
        style={[
          styles.keyboard,
          { width: Math.min(SCREEN_WIDTH * 0.9, 350 * scale) },
        ]}
      >
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keyRow}>
            {row.map((key, colIndex) => (
              <Pressable
                key={colIndex}
                style={({ pressed }) => [
                  styles.key,
                  {
                    width: 70 * scale,
                    height: 70 * scale,
                    borderRadius: 35 * scale,
                  },
                  key === "enter" && styles.enterKey,
                  pressed && commonStyles.buttonPressed,
                  key === "enter" && commonStyles.confirmButtonGreen,
                ]}
                onPress={() => {
                  if (key === "enter") handleEnterPress();
                  else handleKeyPress(key);
                }}
              >
                <Text
                  style={[
                    styles.keyText,
                    {
                      fontSize: 24 * scale,
                      color: "#4F4F4F",
                    },
                  ]}
                >
                  {key === "backspace" ? "⌫" : key === "enter" ? "Enter" : key}
                </Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
  },
  IDEntryLabel: {
    alignItems: "center",
    marginBottom: 20,
  },
  largeAmountContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  largeAmount: {
    fontWeight: "600",
    color: "#1f1f1f",
    fontFamily: "Roboto",
  },
  keyboard: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  keyRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  key: {
    backgroundColor: "#f7f2fa",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  keyText: {
    fontWeight: "700",
    fontFamily: "Roboto",
  },
  enterKey: {
    backgroundColor: "#ece6f0",
  },
  enterKeyText: {
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  label: {
    color: "#4F4F4F",
    textAlign: "center",
    fontFamily: "Roboto",
    lineHeight: 24,
    marginBottom: 10,
  },
});

export default IDEntry;
