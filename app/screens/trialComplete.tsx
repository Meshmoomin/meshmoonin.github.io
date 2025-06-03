import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { commonStyles } from "../styles/commonStyles";

import { useScenarioStore } from "@/app/store/store";
import { useCustomBackHandler } from "@/app/hooks/backHandler";
import { SafeAreaView } from "react-native";

export default function TrialComplete() {
  const navigation = useNavigation<ScreenNavigationProp>();
  useCustomBackHandler(() => true); // Returning `true` disables the back button

  const {
    currentTotal,
    tippedTotal,
    logMessage,
    answers,
    setLogMessage,
    resetLogMessage,
    appendToLog,
  } = useScenarioStore();

  const storeFile = async () => {
    // Add to log
    await appendToLog(logMessage);
  };

  const handleComplete = () => {
    /* setLogMessage("TrialComplete, \n");
    storeFile(); // Save the log message to the CSV file
    console.log(logMessage); */

    console.log(answers); // Debugging only, should be removed in production

    // Debugging only, should be removed in production, will be saved to csv file
    resetLogMessage(); // Reset the log message for the next trial
    navigation.navigate("UniversalScenario");
  };

  const handleCancel = () => {
    resetLogMessage();
    navigation.navigate("UniversalScenario");
  };

  const appendCSV = () => {
    // Append the log message to the CSV file
    //TODO

    // This function should be implemented to handle the actual file writing
    // For now, it's just a placeholder
    console.log("Appending to CSV:", logMessage);
  };

  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      <View style={styles.readOutSection}>
        <Text style={(commonStyles.textLarge, commonStyles.midGrey)}>
          Betrag: {currentTotal.toFixed(2)}€
        </Text>
        <Text style={(commonStyles.textLarge, commonStyles.midGrey)}>
          Trinkgeld: {(tippedTotal - currentTotal).toFixed(2)}€
        </Text>
      </View>

      {/* Preview answers for debugging */}
      <View
        style={{
          width: "100%",
          padding: 10,
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 4,
            color: "#4F4F4F",
          }}
        >
          Antworten-Vorschau:
        </Text>
        <Text
          style={{
            fontFamily: "Roboto",
            fontSize: 14,
            color: "#4F4F4F",
          }}
        >
          {JSON.stringify(answers, null, 2)}
        </Text>
      </View>

      <View style={styles.saveButtonSection}>
        <Pressable
          onPress={handleComplete}
          style={({ pressed }) => [
            commonStyles.button,
            styles.saveButton,
            commonStyles.confirmButtonGreen,
            pressed && commonStyles.buttonPressed,
          ]}
        >
          <Text style={[styles.label, commonStyles.cancelButtonText]}>
            Daten Speichern
          </Text>
        </Pressable>
      </View>
      <View style={styles.cancelButtonSection}>
        <Pressable
          onPress={handleCancel}
          style={({ pressed }) => [
            commonStyles.button,
            styles.cancelButton,
            commonStyles.cancelButtonRed,
            pressed && commonStyles.buttonPressed,
          ]}
        >
          <Text style={[styles.label, commonStyles.cancelButtonText]}>
            Szenario Abbrechen
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  readOutSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  saveButtonSection: {
    flex: 3,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "30%",
  },
  cancelButtonSection: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
  },
  saveButton: {
    backgroundColor: "#ECE6F0",
    height: "20%",
    borderRadius: 5,
    justifyContent: "center",
  },
  cancelButton: {
    padding: 40,
    borderRadius: 5,
    justifyContent: "center",
    height: "50%",
  },
  label: {
    fontSize: 22,
    color: "#4F4F4F",
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "600",
    lineHeight: 28,
  },
});
