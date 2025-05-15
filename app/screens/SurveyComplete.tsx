import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "@/types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import SmileBig from "@/assets/Icons/SmileBig";
import { commonStyles } from "@/app/styles/commonStyles";

export default function SurveyComplete() {
  const navigation = useNavigation<ScreenNavigationProp>();
  const holdTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const handlePressIn = () => {
    holdTimeout.current = setTimeout(() => {
      navigation.navigate("TrialComplete");
    }, 1000);
  };

  const handlePressOut = () => {
    if (holdTimeout.current) {
      clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  };

  return (
    <SafeAreaView style={commonStyles.fullScreen}>
      <View style={styles.centerContent}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={({ pressed }) => [
            styles.smileButton,
            pressed && commonStyles.buttonPressed,
          ]}
        >
          <SmileBig width={240} height={240} />
        </Pressable>
        <Text style={[commonStyles.midGrey, styles.thankYouText]}>
          Vielen Dank!
        </Text>
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
    fontFamily: "Roboto-Regular",
    marginTop: 8,
    textAlign: "center",
  },
});
