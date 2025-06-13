import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { commonStyles } from "@/app/styles/commonStyles";
import { Text, StyleSheet, View, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useScenarioStore } from "@/app/store/store";
import CurrentTotalSmall from "@/app/components/currentTotalSmall";

import CardPlacement from "@/assets/Icons/CardPlacement";
import CheckMark from "@/assets/Icons/CheckMark";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = Math.min(SCREEN_WIDTH / 400, SCREEN_HEIGHT / 800, 1.2);

const PaymentScreenNew = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [paid, setPaid] = React.useState(false);
  const CardPlacementSection = () => (
    <Pressable style={styles.tapPlace} onPress={handlePaymentSuccess}>
      <CardPlacement
        style={styles.placementIcon}
        width={120 * scale}
        height={120 * scale}
      />
    </Pressable>
  );

  const PaidSection = () => (
    <View style={styles.tapPlace}>
      <View style={styles.iconContainer}>
        <CheckMark width={160 * scale} height={160 * scale} />
      </View>
    </View>
  );

  const navigateToFollowUp = () => {
    navigation.navigate("FlowController");
  };
  const { tippedTotal, currentTrial, scenarioFLow, nextScenario } =
    useScenarioStore();

  const handlePaymentSuccess = () => {
    setPaid(true);
    //nextScenario();
    setTimeout(() => {
      navigateToFollowUp();
    }, 1500);
  };

  const handleCancel = () => {
    console.log(scenarioFLow[currentTrial]);
    navigation.navigate("UniversalScenario");
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
            { fontSize: 22 * scale },
          ]}
        >
          Karten-Icon antippen.
        </Text>
        {/* <Pressable
          style={({ pressed }) => [
            commonStyles.button,
            styles.cancelButton,
            commonStyles.centerContent,
            commonStyles.cancelButtonRed,
            pressed && commonStyles.buttonPressed,
            { borderRadius: 20 * scale },
          ]}
          onPress={handleCancel}
        >
          <Text
            style={[commonStyles.cancelButtonText, { fontSize: 20 * scale }]}
          >
            Zurück
          </Text>
        </Pressable> */}
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
  tapPlace: {
    marginVertical: 40 * scale,
    width: "80%",
    height: "30%",
    alignSelf: "center",
    borderColor: "#AFAFAF",
    borderWidth: 5 * scale,
    borderRadius: 20 * scale,
    alignContent: "center",
    justifyContent: "center",
    padding: 10 * scale,
    backgroundColor: "#fff",
  },
  placementIcon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 20 * scale,
    margin: 20 * scale,
  },
  instructionText: {
    marginTop: 20 * scale,
    textAlign: "center",
    fontWeight: "500",
  },
  cancelButton: {
    margin: 40 * scale,
    width: "80%",
    height: 56 * scale,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 4 * scale },
    shadowRadius: 8 * scale,
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
    padding: 20 * scale,
  },
});

export default PaymentScreenNew;
