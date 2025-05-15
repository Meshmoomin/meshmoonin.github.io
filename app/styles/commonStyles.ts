import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  midGrey: {
    color: "#4F4F4F",
  },
  lightGrey: {
    color: "#AFAFAF",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  shadowBox: {
    backgroundColor: "#ece6f0",
    borderRadius: 16,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba(0, 0, 0, 0.15)",
  },
  textCenter: {
    textAlign: "center",
    color: "#4f4f4f",
    fontFamily: "Roboto",
  },
  textLarge: {
    fontSize: 42,
  },
  textSmall: {
    fontSize: 22,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  bodyText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Roboto",
    textAlign: "left",
  },
  marginSmall: {
    margin: 8,
  },
  marginMedium: {
    margin: 16,
  },
  paddingSmall: {
    padding: 8,
  },
  paddingMedium: {
    padding: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#ECE6F0",
    borderRadius: 16,
    alignItems: "center",
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  cancelButtonText: {
    fontSize: 22,
    lineHeight: 28,
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "600",
    color: "#4F4F4F",
  },
  fullScreen: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    borderRadius: 100,
    padding: 10,
    backgroundColor: "#ece6f0",
  },
  cancelButton: {
    marginTop: 50,
    width: "80%",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonRed: {
    backgroundColor: "#EFB5B1",
  },
  confirmButtonGreen: {
    backgroundColor: "#C1DFCD",
  },
  tapPlace: {
    marginTop: 50,
    width: "80%",
    height: 200,
    alignSelf: "center",
  },
  instructionText: {
    marginTop: 20,
    textAlign: "center",
    color: "#4f4f4f",
    fontSize: 16,
    fontFamily: "Roboto",
  },
});
