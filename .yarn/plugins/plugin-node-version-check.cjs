const { readFileSync } = require("fs");
const { join } = require("path");

module.exports = {
  name: "plugin-node-version-check",
  factory: (_require) => {
    return {
      hooks: {
        validateWorkspace(workspace, { reportError }) {
          if (workspace.cwd !== workspace.project.cwd) {
            return;
          }

          const nvmrcPath = join(workspace.cwd, ".nvmrc");

          let nvmrcFile;
          try {
            nvmrcFile = readFileSync(nvmrcPath, "utf8");
          } catch {
            // No .nvmrc file, so exit without checking.
            return;
          }

          const requiredVersion = parseInt(nvmrcFile.trim(), 10);
          const actualVersion = parseInt(process.version.slice(1), 10);
          if (actualVersion < requiredVersion) {
            reportError(
              0,
              `Node ${requiredVersion}+ is required (current: ${process.version}). Run: \`nvm use\` and then \`corepack enable\` to switch to the correct version and enable Yarn through Corepack.`,
            );
          }
        },
      },
    };
  },
};
