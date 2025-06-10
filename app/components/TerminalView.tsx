import React, { ReactNode } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const TERMINAL_ASPECT_RATIO = 7 / 16; // Portrait phone ratio
const MAX_WIDTH = 700; // Max width for desktop

type TerminalViewProps = {
  children: ReactNode; // Explicitly typep children prop
};

export default function TerminalView({ children }: TerminalViewProps) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const width = Math.min(windowWidth, MAX_WIDTH);
  const height = Math.min(width / TERMINAL_ASPECT_RATIO, windowHeight);
  return <View style={[styles.container, { width, height }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    minHeight: "100%",
    alignSelf: "center", // Centers horizontally
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "scroll",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
});
