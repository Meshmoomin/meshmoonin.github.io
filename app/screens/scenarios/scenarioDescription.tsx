import * as React from "react";
import { Text, StyleSheet, View, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { commonStyles } from "@/app/styles/commonStyles";
import BackButton from "@/app/components/backButton";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = Math.min(SCREEN_WIDTH / 400, SCREEN_HEIGHT / 800, 1.2);

interface ScenarioDespriptionProps {
  total: number; // e.g., 5.15, 10.3, 16.55
}

export default function ScenarioDescription({
  total,
}: ScenarioDespriptionProps) {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { nextScenario } = useScenarioStore();

  const currentTotal = total;

  const handleContinue = () => {
    nextScenario();
    navigation.navigate("FlowController");
  };

  let descriptionText = null;
  if (total === 7.15) {
    descriptionText = (
      <Text
        style={[
          styles.descText,
          commonStyles.midGrey,
          { fontSize: 22 * scale, lineHeight: 30 * scale },
        ]}
      >
        Du bestellst zwei Heißgetränke zum mitnehmen bei einem Café, das du
        öfter besuchst - einen Cappuccino für dich, und eine heiße Schokolade
        für eine Freundin, die draußen vorm Laden auf dich wartet. Beide
        Getränke kosten zusammen: {currentTotal.toFixed(2)}€ Du bezahlst am
        Tresen und dir wird folgendes Interface für Trinkgeld präsentiert:
      </Text>
    );
  } else if (total === 10.3) {
    descriptionText = (
      <Text
        style={[
          styles.descText,
          commonStyles.midGrey,
          { fontSize: 22 * scale, lineHeight: 30 * scale },
        ]}
      >
        Du sitzt an einem regnerischen Nachmittag in deinem Lieblingscafé,
        trinkst zwei Tassen Filterkaffee und isst ein Stück Karottenkuchen. Du
        sammelst deine Sachen zusammen und kommst zum Zahlen an den Tresen. Der
        offene Betrag ist: {currentTotal.toFixed(2)}€ Du bezahlst am Tresen und
        dir wird folgendes Interface für Trinkgeld präsentiert:
      </Text>
    );
  } else if (total === 12.55) {
    descriptionText = (
      <Text
        style={[
          styles.descText,
          commonStyles.midGrey,
          { fontSize: 22 * scale, lineHeight: 30 * scale },
        ]}
      >
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
      <View style={[styles.centerFlexColumn, { marginHorizontal: 40 * scale }]}>
        {descriptionText}
        <View
          style={[
            styles.continueButtonSection,
            { padding: 20 * scale, marginTop: 24 * scale },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              commonStyles.confirmButtonPressable,
              commonStyles.shadowBox,
              commonStyles.confirmButtonGreen,
              pressed && commonStyles.buttonPressed,
              {
                borderRadius: 28 * scale,
                paddingVertical: 20 * scale,
                paddingHorizontal: 12 * scale,
                width: "60%",
              },
            ]}
            onPress={handleContinue}
          >
            <Text
              style={[commonStyles.confirmButtonText, { fontSize: 40 * scale }]}
            >
              Weiter
            </Text>
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
  },
  descText: {
    color: "#4F4F4F",
    textAlign: "center",
    fontFamily: "Roboto",
    marginTop: 60,
    marginBottom: 40,
    maxWidth: "100%",
    alignSelf: "center",
  },
  continueButtonSection: {
    alignItems: "center",
    marginHorizontal: 10,
  },
});
