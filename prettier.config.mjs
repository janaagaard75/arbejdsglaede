/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  experimentalOperatorPosition: "start",
  plugins: ["prettier-plugin-tailwindcss"],
  singleAttributePerLine: true,
};

export default config;
