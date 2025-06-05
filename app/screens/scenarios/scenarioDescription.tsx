import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { commonStyles } from "@/app/styles/commonStyles";
import BackButton from "@/app/components/backButton";

interface ScenarioDespriptionProps {
  total: number; // e.g., 5.15, 10.3, 16.55
}

export default function ScenarioDescription({
  total,
}: ScenarioDespriptionProps) {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { nextScenario } = useScenarioStore();

  // Use the passed-in total instead of currentTotal from store
  const currentTotal = total;

  const handleContinue = () => {
    nextScenario();
    navigation.navigate("FlowController"); //Shortcut for testing only
  };

  // Select interface based on interfaceType
  let descriptionText = null;
  if (total === 5.15) {
    descriptionText = (
      <Text style={[styles.descText, commonStyles.midGrey]}>
        Du bestellst zwei Heißgetränke zum mitnehmen bei einem Café, das du
        öfter besuchst - einen Espresso für dich, und eine heiße Schokolade für
        eine Freundin, die draußen vorm Laden auf dich wartet. Beide Getränke
        kosten zusammen: {currentTotal.toFixed(2)}€ Du bezahlst am Tresen und
        dir wird folgendes Interface für Trinkgeld präsentiert:
      </Text>
    );
  } else if (total === 10.3) {
    descriptionText = (
      <Text style={[styles.descText, commonStyles.midGrey]}>
        Du sitzt an einem regnerischen Nachmittag in deinem Lieblingscafé,
        trinkst zwei Tassen Filterkaffee und isst ein Stück Karottenkuchen. Du
        sammelst deine Sachen zusammen und kommst zum Zahlen an den Tresen. Der
        offene Betrag ist: {currentTotal.toFixed(2)}€ Du bezahlst am Tresen und
        dir wird folgendes Interface für Trinkgeld präsentiert:
      </Text>
    );
  } else if (total === 14.55) {
    descriptionText = (
      <Text style={[styles.descText, commonStyles.midGrey]}>
        Du trifftst dich zum Lernen mit einer Freundin in einem ruhigen Café.
        Ihr trinkt jeder ein Heißgetränk. Du hast aber länger nichts gegessen
        und bestellst dir auch noch ein gegrilltes Panini dazu. Als Dank für
        ihre Hilfe mit dem Lernstoff, lädst du die Freundin ein und zahlst ihr
        Getränk mit. Insgesamt kommt ihr auf: {currentTotal.toFixed(2)}€ Du
        bezahlst am Tresen und dir wird folgendes Interface für Trinkgeld
        präsentiert:
      </Text>
    );
  }

  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      <BackButton />
      <View style={styles.centerFlexColumn}>
        {descriptionText}
        <View style={styles.continueButtonSection}>
          <Pressable
            style={({ pressed }) => [
              commonStyles.confirmButtonPressable,
              commonStyles.shadowBox,
              commonStyles.confirmButtonGreen,
              pressed && commonStyles.buttonPressed,
            ]}
            onPress={() => handleContinue()}
          >
            <Text style={commonStyles.confirmButtonText}>Weiter</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "space-between",
  },
  centerFlexColumn: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginHorizontal: 40,
  },
  descText: {
    fontSize: 20,
    color: "#4F4F4F",
    textAlign: "center",
    fontFamily: "Roboto",
    lineHeight: 28,
    marginBottom: 40,
    maxWidth: "90%",
  },
  continueButtonSection: {
    alignItems: "center",
    marginTop: 24,
    marginHorizontal: 10,
    padding: 20,
  },
  continueButton: {
    width: "60%",
    backgroundColor: "#ece6f0",
    borderRadius: 28,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
