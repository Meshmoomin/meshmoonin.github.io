module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-transform-private-methods", { loose: true }], // Ensure loose mode matches
    ["@babel/plugin-transform-private-property-in-object", { loose: true }], // Add this plugin with loose mode
    ["react-native-web"],
    "react-native-reanimated/plugin", // Keep this at the end
  ],
};
