import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [".claude/**"],
  ignoreBinaries: [
    // The 1Password CLI is installed separately and reads the EAS token in the eas script.
    "op",
    // QuickLook ships with macOS, so scripts/generateIcons.ts calls it without depending on a package.
    "qlmanage",
  ],
};

export default config;
