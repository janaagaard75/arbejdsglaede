module.exports = {
  name: "plugin-node-version-check",
  factory: (require) => {
    const { semverUtils } = require("@yarnpkg/core");

    return {
      hooks: {
        validateWorkspace(workspace, { reportError }) {
          const requiredVersion = workspace.manifest.raw.engines?.node;
          if (
            requiredVersion
            && !semverUtils.satisfiesWithPrereleases(
              process.version,
              requiredVersion,
            )
          ) {
            reportError(
              0,
              `Node ${requiredVersion} is required (current: ${process.version}). Run \`nvm use\` and \`corepack enable\`.`,
            );
          }
        },
      },
    };
  },
};
