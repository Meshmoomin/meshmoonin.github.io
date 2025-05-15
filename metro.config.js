const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Enable web support
config.resolver.assetExts.push("web.js");
config.resolver.sourceExts.push("web.js");

module.exports = config;
