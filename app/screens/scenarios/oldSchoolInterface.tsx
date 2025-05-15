import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { commonStyles } from "@/app/styles/commonStyles";
import BackButton from "@/app/components/backButton";
import CurrentTotalSmall from "@/app/components/currentTotalSmall";

const OldSchoolInterface = () => {
  const [amount, setAmount] = useState(""); // State to manage the large amount
  const navigation = useNavigation<ScreenNavigationProp>();
  const { currentTotal, setTippedTotal, setTipSelectionLog } =
    useScenarioStore();

  const handleEnterPress = () => {
    // Handle the Enter key press
    var tippedTotal = parseFloat(amount);
    if (tippedTotal >= currentTotal) {
      setTippedTotal(tippedTotal); // Save the amount to the store
      /* console.log("Total amount set to:", amount); // Debugging line */ // Debug, remove in production
      setTipSelectionLog(
        "TippedTotal, " +
          amount +
          ", TipPercentage, " +
          ((tippedTotal - currentTotal) / currentTotal).toFixed(2) +
          ", "
      ); // Debugging line
      navigation.navigate("Payment"); // Navigate to the next screen
    }
  };

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      // Remove the last character
      setAmount((prev) => (prev.length > 0 ? prev.slice(0, -1) : ""));
    } else if (key === "." && amount.includes(".")) {
      // Prevent multiple decimal points
      return;
    } else {
      // Append the key to the amount
      setAmount((prev) => (prev.length < 10 ? prev + key : prev)); // Limit to 10 characters
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      {/* Current Total */}
      <CurrentTotalSmall currentTotal={currentTotal} />

      {/* Editable Large Amount */}
      <View style={styles.largeAmountContainer}>
        <Text style={styles.largeAmount}>{amount || "0.00"}€</Text>
      </View>

      {/* On-Screen Keyboard */}
      <View style={styles.keyboard}>
        {[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          ".",
          "0",
          "backspace",
        ].map((key, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.key,
              pressed && commonStyles.buttonPressed,
            ]}
            onPress={() => handleKeyPress(key)}
          >
            <Text style={styles.keyText}>
              {key === "backspace" ? "⌫" : key}
            </Text>
          </Pressable>
        ))}
        <Pressable
          style={({ pressed }) => [
            styles.key,
            styles.enterKey,
            commonStyles.confirmButtonGreen,
            pressed && commonStyles.buttonPressed,
          ]}
          onPress={() => handleEnterPress()}
        >
          <Text
            style={[
              styles.enterKeyText,
              commonStyles.textSmall,
              commonStyles.midGrey,
            ]}
          >
            Enter
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignContent: "center",
    justifyContent: "center",
  },
  totalBox: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  totalText: {
    fontSize: 28,
    lineHeight: 40,
    fontWeight: 500,
    fontFamily: "Roboto",
    color: "#afafaf",
    textAlign: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "500",
    color: "#afafaf",
    fontFamily: "Roboto",
  },
  smallAmount: {
    fontSize: 20,
    fontWeight: "500",
    color: "#afafaf",
    fontFamily: "Roboto",
  },
  largeAmountContainer: {
    alignItems: "center",
    marginVertical: 40,
  },
  largeAmount: {
    fontSize: 60,
    fontWeight: "600",
    color: "#1f1f1f",
    fontFamily: "Roboto",
  },
  keyboard: {
    width: "80%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  key: {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 40,
    backgroundColor: "#f7f2fa",
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1d1b20",
    fontFamily: "Roboto",
  },
  enterKey: {
    backgroundColor: "#ece6f0",
  },
  enterKeyText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
});

export default OldSchoolInterface;
