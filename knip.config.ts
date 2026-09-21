import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [".claude/**"],
  // Yarn provides its core API to plugins at runtime.
  ignoreDependencies: ["@yarnpkg/core"],
  ignoreBinaries: [
    // The 1Password CLI is installed separately and reads the EAS token in the eas script.
    "op",
  ],
};

export default config;
