import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: [".claude/**"],
  // QuickLook ships with macOS, so scripts/generateIcons.ts calls it without depending on a package.
  ignoreBinaries: ["qlmanage"],
};

export default config;
