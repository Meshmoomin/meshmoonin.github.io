import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { commonStyles } from "@/app/styles/commonStyles";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScenarioStore } from "@/app/store/store";
import BackButton from "@/app/Archive/backButton";
import CurrentTotalSmall from "@/app/components/currentTotalSmall";

import CardPlacement from "@/assets/Icons/CardPlacement";
import CheckMark from "@/assets/Icons/CheckMark";

const PaymentScreenNew = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [paid, setPaid] = React.useState(false);
  const CardPlacementSection = () => (
    <Pressable style={styles.tapPlace} onPress={handlePaymentSuccess}>
      <CardPlacement style={styles.placementIcon} />
    </Pressable>
  );

  const PaidSection = () => (
    <View style={styles.tapPlace}>
      <View style={styles.iconContainer}>
        <CheckMark width={200} height={200} />
        {/* Or use your Check icon */}
      </View>
    </View>
  );

  const navigateToFollowUp = () => {
    navigation.navigate("UniversalFollowUp");
  };
  const { tippedTotal, totalEntryLog, tipSelectionLog, setLogMessage } =
    useScenarioStore();

  const handlePaymentSuccess = () => {
    setLogMessage(totalEntryLog + tipSelectionLog + "Payment, success, ");
    setPaid(true);
    // Simulate a payment success and navigate to the follow-up screen
    setTimeout(() => {
      navigateToFollowUp();
    }, 1500);
  };

  return (
    <SafeAreaView style={[commonStyles.fullScreen, styles.container]}>
      <View style={[styles.baseScreen, commonStyles.centerContent]}>
        <CurrentTotalSmall currentTotal={tippedTotal} />
        {paid ? <PaidSection /> : <CardPlacementSection />}
        <Text
          style={[
            commonStyles.textLarge,
            styles.instructionText,
            commonStyles.lightGrey,
          ]}
        >
          Karte an den Bildschirm halten
        </Text>
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
  tapPlace: {
    marginVertical: 60,
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
  cancelButton: {
    margin: 50,
    width: "80%",
    height: "10%",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  overlay: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default PaymentScreenNew;
