import * as React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Check from "@/assets/Icons/CheckMark";

const { width: screenWidth } = Dimensions.get("window");

const PaymentConfirmedOverlay = () => {
  // Responsive sizing for the check icon and overlay
  const overlayHeight = Math.min(320, screenWidth * 0.7);
  const iconSize = overlayHeight * 0.6;

  return (
    <SafeAreaView style={[styles.overlay, { height: overlayHeight }]}>
      <View style={styles.background} />
      <View style={styles.iconContainer}>
        <Check width={iconSize} height={iconSize} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#1f1f1f",
    borderWidth: 7,
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});

export default PaymentConfirmedOverlay;
