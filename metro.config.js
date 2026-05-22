const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config, {
  // Disabling inlineVariables means that the CSS variables will not be inlined into the JavaScript bundle. This allows changing the layout by changing the CSS variables at runtime.
  // inlineVariables: false,
});
