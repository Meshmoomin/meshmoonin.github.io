import * as React from "react";
import { Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";

const BackButton1 = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  return (
    <Text
      style={{
        position: "absolute",
        top: 50,
        left: 20,
        fontSize: 16,
        color: "#4f4f4f",
        fontFamily: "Roboto-Regular",
      }}
      onPress={() => navigation.goBack()}
    >
      {" "}
      Zurück
    </Text>
  );
};
export default BackButton1;
