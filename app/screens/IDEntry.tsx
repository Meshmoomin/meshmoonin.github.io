import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { commonStyles } from "@/app/styles/commonStyles";
import BackButton from "../components/backButton";

// Possible values
const INTERFACE_TYPES = ["options", "rounding"] as const;
//const FORMATS = ["sumRound", "sumFixed", "Fixed", "Percent"] as const; Disabled for Debugging TODO reenable
const FORMATS = ["Fixed"] as const; //Reduced for faster Debugging
const TOTALS = [5.15, 10.3, 14.55] as const;

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

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <View style={styles.IDEntryLabel}>
        <Text style={styles.label}>Teilnahme ID eingeben:</Text>
      </View>
      {/* Editable Large Amount */}
      <View style={styles.largeAmountContainer}>
        <Text style={styles.largeAmount}>{amount || "-"}</Text>
      </View>

      {/* On-Screen Keyboard */}
      <View style={styles.keyboard}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace"].map(
          (key, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.key,
                pressed && commonStyles.buttonPressed,
              ]}
              onPress={() => handleKeyPress(key)}
            >
              <Text style={styles.keyText}>
                {key === "backspace" ? "⌫" : key}
              </Text>
            </Pressable>
          )
        )}
        <Pressable
          style={({ pressed }) => [
            styles.key,
            styles.enterKey,
            commonStyles.confirmButtonGreen,
            pressed && commonStyles.buttonPressed,
          ]}
          onPress={() => handleEnterPress()}
        >
          <Text
            style={[
              styles.enterKeyText,
              commonStyles.textSmall,
              commonStyles.midGrey,
            ]}
          >
            Enter
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  IDEntryLabel: {
    alignItems: "center",
    marginBottom: 20,
  },

  topAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
    color: "#afafaf",
    fontFamily: "Roboto",
  },
  smallAmount: {
    fontSize: 20,
    fontWeight: "500",
    color: "#afafaf",
    fontFamily: "Roboto",
  },
  largeAmountContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  largeAmount: {
    fontSize: 60,
    fontWeight: "600",
    color: "#1f1f1f",
    fontFamily: "Roboto",
  },
  keyboard: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  key: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 40,
    backgroundColor: "#f7f2fa",
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1d1b20",
    fontFamily: "Roboto",
  },
  enterKey: {
    backgroundColor: "#ece6f0",
  },
  enterKeyText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
});

export default IDEntry;
