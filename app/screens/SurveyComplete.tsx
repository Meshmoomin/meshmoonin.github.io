import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import SmileBig from "@/assets/Icons/SmileBig";
import { commonStyles } from "@/app/styles/commonStyles";
import { useScenarioStore } from "@/app/store/store";

let hasSubmittedGlobal = false; // <-- Add this at the top, outside the component

export default function SurveyComplete() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const { answers } = useScenarioStore();

  const submitToGoogleForm = async (answers: Record<string, unknown>) => {
    const formUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSdSvwWXHPAmbHWWEszdPB8Z2Ik9FZApj0yu-5QTz7GpgN6sLQ/formResponse";

    // Convert answers object to CSV string
    // Format: key1,value1\nkey2,value2\n...
    const csvString =
      Object.keys(answers).join(",") + "\n" + Object.values(answers).join(",");

    // Replace with your actual entry ID for the long answer field
    const entryId = "entry.531321985";

    const formData = new URLSearchParams();
    formData.append(entryId, csvString);

    try {
      await fetch(formUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });
      console.log("Submission successful!");
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  React.useEffect(() => {
    if (!hasSubmittedGlobal) {
      submitToGoogleForm(answers);
      hasSubmittedGlobal = true;
    }
  }, [answers]);

  return (
    <SafeAreaView style={commonStyles.fullScreen}>
      <View style={styles.centerContent}>
        <View style={styles.instructionSection}>
          {/* <Text
            style={[
              commonStyles.textSmall,
              commonStyles.lightGrey,
              styles.instructionText,
            ]}
          >
            Admin Feature: Smiley 1 Sek. gedrückt halten um zum Speichern der
            Daten zu kommen.
          </Text> */}
        </View>
        <SmileBig width={240} height={240} />
        <View style={styles.textSection}>
          <Text style={[commonStyles.midGrey, styles.thankYouText]}>
            Vielen Dank!
          </Text>
          <Text
            style={[
              { alignContent: "center" },
              commonStyles.textSmall,
              commonStyles.lightGrey,
            ]}
          >
            Jetzt geht es bei Limesurvey weiter. Das Passwort ist:
          </Text>
          <Text
            style={[
              commonStyles.textSmall,
              { fontWeight: "bold" },
              commonStyles.lightGrey,
            ]}
          >
            "Streuselschnecke"
          </Text>
        </View>
        {/* <Pressable
          style={({ pressed }) => [
            commonStyles.button,
            styles.smileButton,
            pressed && commonStyles.buttonPressed,
          ]}
          onPress={() => {
            submitToGoogleForm(answers);
          }}
        >
          <Text style={[commonStyles.textSmall, commonStyles.midGrey]}>
            Daten Speichern
          </Text>
        </Pressable> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  smileButton: {
    marginBottom: 32,
    borderRadius: 60,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  thankYouText: {
    fontSize: 32,
    fontFamily: "Roboto",
    marginTop: 8,
    textAlign: "center",
  },
  instructionText: {
    fontSize: 16,
    fontFamily: "Roboto",
    marginBottom: 8,
    textAlign: "center",
  },
  instructionSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  textSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    paddingHorizontal: 20,
  },
});
