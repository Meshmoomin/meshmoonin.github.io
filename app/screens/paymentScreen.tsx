import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { commonStyles } from "@/app/styles/commonStyles";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScenarioStore } from "@/app/store/store";
import BackButton from "@/app/components/backButton";

import CardPlacement from "@/assets/Icons/CardPlacement";

const PaymentScreenNew = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const navigateToFollowUp = () => {
    navigation.navigate("FollowUpGeneral");
  };
  const { tippedTotal, totalEntryLog, tipSelectionLog, setLogMessage } =
    useScenarioStore();

  const handlePaymentSuccess = () => {
    setLogMessage(totalEntryLog + tipSelectionLog + "Payment, success, ");
    navigateToFollowUp();
  };

  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      <BackButton />
      <View style={[styles.baseScreen, commonStyles.centerContent]}>
        {/* Amount Display */}
        <View style={[styles.amountContainer, commonStyles.centerContent]}>
          <Text style={[commonStyles.textLarge, commonStyles.lightGrey]}>
            Betrag:
          </Text>
          <Text style={[commonStyles.textLarge, styles.amountText]}>
            {tippedTotal.toFixed(2)}€
          </Text>
        </View>

        {/* Tap Place Area */}
        <Pressable style={styles.tapPlace} onPress={handlePaymentSuccess}>
          <CardPlacement style={styles.placementIcon} />
        </Pressable>

        {/* Instruction Text */}
        <Text
          style={[
            commonStyles.textLarge,
            styles.instructionText,
            commonStyles.lightGrey,
          ]}
        >
          Karte an den Bildschirm halten
        </Text>

        {/* Cancel Button */}
        <Pressable
          style={({ pressed }) => [
            commonStyles.button,
            styles.cancelButton,
            commonStyles.centerContent,
            commonStyles.cancelButtonRed,
            pressed && commonStyles.buttonPressed,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={[commonStyles.cancelButtonText]}>Zurück</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  baseScreen: {
    flex: 1,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    borderRadius: 100,
    padding: 10,
    backgroundColor: "#ece6f0",
  },
  backButtonText: {
    margin: 10,
    color: "#49454f",
  },
  tapPlace: {
    margin: 30,
    width: "80%",
    height: "30%",
    alignSelf: "center",
    borderColor: "#4F4F4F",
    borderWidth: 7,
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    padding: 0,
  },
  placementIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  instructionText: {
    marginTop: 20,
    textAlign: "center",
    fontWeight: "500",
  },
  amountContainer: {
    marginTop: 30,
  },
  amountText: {
    color: "#afafaf",
    marginHorizontal: 5,
  },
  cancelButton: {
    margin: 50,
    width: "80%",
    height: "10%",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
});

export default PaymentScreenNew;
