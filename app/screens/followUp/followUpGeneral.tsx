import * as React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { useScenarioStore } from "@/app/store/store";
import { useCustomBackHandler } from "@/app/hooks/backHandler";

import FullSmile from "../../../assets/Icons/FullSmile";
import PartialSmile from "../../../assets/Icons/PartialSmile";
import Indifferent from "../../../assets/Icons/Indifferent";
import PartialFrown from "../../../assets/Icons/PartialFrown";
import FullFrown from "../../../assets/Icons/FullFrown";

import { commonStyles } from "@/app/styles/commonStyles";

export default function FollowUpGeneral() {
  const navigation = useNavigation<ScreenNavigationProp>();
  useCustomBackHandler(() => true); // Returning `true` disables the back button

  const { setLogMessage } = useScenarioStore();

  const handleOptionSelect = (value: number) => {
    setLogMessage("FollowUpGeneral, " + value + ", "); // save data for csv
    navigation.navigate("FollowUpComplexity");
  };

  const options = [
    { Component: FullSmile, value: 5 },
    { Component: PartialSmile, value: 4 },
    { Component: Indifferent, value: 3 },
    { Component: PartialFrown, value: 2 },
    { Component: FullFrown, value: 1 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        Wie hat Ihnen der Bezahlprozess gefallen?
      </Text>
      <View style={styles.optionsRow}>
        {options.map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && commonStyles.buttonPressed,
            ]}
            onPress={() => handleOptionSelect(item.value)}
          >
            <item.Component color={"#4F4F4F"} width={48} height={48} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  questionText: {
    fontSize: 32,
    color: "#4F4F4F",
    textAlign: "center",
    fontFamily: "Roboto",
    lineHeight: 38,
    marginBottom: 40,
    maxWidth: "90%",
  },
  optionsRow: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  iconButton: {
    width: 94,
    height: 94,
    backgroundColor: "#ece6f0",
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
  },
});
