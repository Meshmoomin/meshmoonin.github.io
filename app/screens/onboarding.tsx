import * as React from "react";
import { Text, StyleSheet, View, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { commonStyles } from "@/app/styles/commonStyles";
import { ScrollView } from "react-native-gesture-handler";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = Math.min(SCREEN_WIDTH / 400, SCREEN_HEIGHT / 800, 1.2);

const Onboarding = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const handleContinue = () => {
    navigation.navigate("FlowController");
  };

  return (
    <ScrollView
      style={[commonStyles.fullScreen]}
      contentContainerStyle={[styles.container]}
    >
      <View style={[styles.centerFlexColumn, { marginHorizontal: 40 * scale }]}>
        <Text
          style={[
            styles.descText,
            commonStyles.midGrey,
            { fontSize: 22 * scale, lineHeight: 30 * scale },
          ]}
        >
          In dieser Studie testest du 2 Interfaces mit verschienen
          Formatierungen von Trinkgeld Optionen. {"\n"}
          Dir werden Szenarien beschrieben in denen du in einem Café mit Karte
          bezahlst, dann siehst du das Interface auf dem Bezahlterminal und
          suchst die Option aus, die du auch in echt gewählt hättest. Danach
          musst du immer ein paar Fragen beantworten.
          {"\n\n"}
          Nachdem du alle Formate im ersten Interface getestet hast, werden dir
          einige Fragen präsentiert, die sich auf das Inteface allgemein
          beziehen. Unabhängig von der Formatierung der Vorschläge. Dann folgt
          der Block mit dem zweiten Interface, ebenfalls mit Fragen zum
          Interface allgemein.
        </Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "space-between", // Now OK, because it's in contentContainerStyle
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
export default Onboarding;
