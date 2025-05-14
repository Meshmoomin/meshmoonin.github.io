import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import PaymentConfirmedOverlay from "./paymentConfirmedOverlayCodegen";
import
interface cardPlacementSectionProps {
  payed: boolean;
}

const CardPlacementSection: React.FC<cardPlacementSectionProps> = ({
  payed,
}) => {
    if (!payed) {

  return (
    <Pressable style={styles.tapPlace} onPress={handlePaymentSuccess}>
          <CardPlacement style={styles.placementIcon} />
        </Pressable>
  );
};

const styles = StyleSheet.create({
  totalText: {
    fontSize: 28,
    lineHeight: 40,
    fontWeight: 500,
    fontFamily: "Roboto",
    color: "#afafaf",
    textAlign: "center",
  },
  totalBox: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CardPlacementSection;
