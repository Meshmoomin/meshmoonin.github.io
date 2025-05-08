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

export default function FollowUpGeneral() {
  const navigation = useNavigation<ScreenNavigationProp>();
  useCustomBackHandler(() => true); // Returning `true` disables the back button

  const { setLogMessage } = useScenarioStore();

  const handleOptionSelect = (value: number) => {
    setLogMessage("FollowUpGeneral, " + value + ", "); // save data for csv
    navigation.navigate("FollowUpComplexity");
  };

  return (
    <View style={styles.container}>
      {/*  Debugging Remove in Production */}
      <Text style={styles.questionText}>
        Wie hat Ihnen der Bezahlprozess gefallen?
      </Text>

      <View style={styles.ratingContainer}>
        {[
          { Component: FullSmile, value: 5 },
          { Component: PartialSmile, value: 4 },
          { Component: Indifferent, value: 3 },
          { Component: PartialFrown, value: 2 },
          { Component: FullFrown, value: 1 },
        ].map((item, index) => (
          <Pressable
            key={index}
            style={({ pressed }) => [
              styles.ratingButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => handleOptionSelect(item.value)}
          >
            <View style={styles.iconContainer}>
              <item.Component style={styles.icon} width={36} height={36} />
            </View>
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
  ratingContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    width: "100%",
  },
  ratingButton: {
    width: 70,
    height: 70,
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
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  iconContainer: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    overflow: "hidden",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    fontSize: 16,
    color: "#4f4f4f",
    fontFamily: "Roboto-Regular",
  },
});

/* return (
    		<View style={styles.Container}>
					<Text style={styles.questionText}>Wie hat Ihnen der Bezahlprozess gefallen?</Text>
          					<View style={styles.buttonsLabels}>
            						<View style={styles.buttons}>
										<Pressable style={[styles.scaleOption, styles.scaleShadowBox]} onPress={()=>{handleOptionSelect(5)}}>
											<View style={styles.stateLayerWrapper}>
													<View style={[styles.stateLayer, styles.stateLayerFlexBox]}>
														<FullSmile style={styles.icon} width={36} height={36} />
													</View>
											</View>
										</Pressable>
											<View style={[styles.scaleOption1, styles.scaleShadowBox]}>
												<View style={styles.stateLayerWrapper}>
														<View style={[styles.stateLayer, styles.stateLayerFlexBox]}>
															<PartialSmile style={styles.icon} width={36} height={36} />
														</View>
												</View>
											</View>
											<View style={[styles.scaleOption2, styles.scaleShadowBox]}>
												<View style={styles.stateLayerWrapper}>
														<View style={[styles.stateLayer, styles.stateLayerFlexBox]}>
															<Indifferent style={styles.icon} width={36} height={36} />
														</View>
												</View>
											</View>
											<View style={[styles.scaleOption3, styles.scaleShadowBox]}>
												<View style={styles.stateLayerWrapper}>
														<View style={[styles.stateLayer, styles.stateLayerFlexBox]}>
															<PartialFrown style={styles.icon} width={36} height={36} />
														</View>
												</View>
											</View>
											<View style={[styles.scaleOption4, styles.scaleShadowBox]}>
												<View style={styles.stateLayerWrapper}>
														<View style={[styles.stateLayer, styles.stateLayerFlexBox]}>
															<FullFrown style={styles.icon} width={36} height={36} />
														</View>
												</View>
											</View>
            						</View>
          					</View>
					</View>
			);
};
        				
        				const styles = StyleSheet.create({
          					stateLayerPosition: {
            						left: 0,
            						top: 0,
            						position: "absolute"
          					},
          					stateLayerFlexBox: {
            						flexDirection: "row",
            						alignItems: "center"
          					},
          					scaleShadowBox: {
            						height: 94,
            						width: 94,
            						backgroundColor: "#ece6f0",
            						borderRadius: 28,
            						shadowOpacity: 1,
            						elevation: 8,
            						shadowRadius: 8,
            						shadowOffset: {
              							width: 0,
              							height: 4
            						},
            						shadowColor: "rgba(0, 0, 0, 0.15)",
            						overflow: "hidden",
            						flexDirection: "row",
            						justifyContent: "center",
            						alignItems: "center"
          					},
          					questionText: {
            						height: "14.63%",
            						width: "70.68%",
            						top: "9.93%",
            						left: "14.66%",
            						fontSize: 32,
            						lineHeight: 40,
            						fontFamily: "Roboto-Regular",
            						color: "#4f4f4f",
            						textAlign: "center",
            						display: "flex",
            						justifyContent: "center",
            						alignItems: "center",
            						position: "absolute"
          					},
          					icon: {
            						overflow: "hidden"
          					},
          					stateLayer: {
            						padding: 30,
            						justifyContent: "center",
            						left: 0,
            						top: 0,
            						position: "absolute"
          					},
          					stateLayerWrapper: {
            						width: 96,
            						height: 96
          					},
          					scaleOption: {
            						overflow: "hidden"
          					},
          					scaleOption1: {
            						overflow: "hidden"
          					},
          					scaleOption2: {
            						overflow: "hidden"
          					},
          					scaleOption3: {
            						overflow: "hidden"
          					},
          					scaleOption4: {
            						overflow: "hidden"
          					},
          					buttons: {
            						height: "90%",
            						alignItems: "flex-end",
            						gap: 15,
            						justifyContent: "center"
          					},
          					buttonsLabels: {
            						marginLeft: -47,
            						top: 257,
            						left: "50%",
            						justifyContent: "center",
            						position: "absolute",
            						flexDirection: "row"
          					},
          					Container: {
            						flex: 1,
            						width: "100%",
            						height: "100%",
									paddingVertical: 20,
          					}
        				}); */
