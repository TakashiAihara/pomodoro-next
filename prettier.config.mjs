/** @typedef  {import("prettier").Config} PrettierConfig*/
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/
// /** @typedef  {{ tailwindConfig: string }} TailwindConfig*/

// /** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
/** @type { PrettierConfig | SortImportsConfig } */
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  // pluginSearchDirs: false,
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    // "prettier-plugin-tailwindcss",
    "prettier-plugin-packagejson",
  ],
  // tailwindConfig: "./tailwind.config.js",
  importOrder: [
    "<BUILTIN_MODULES>",
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "^~/utils/(.*)$",
    "^~/components/(.*)$",
    "^~/styles/(.*)$",
    "^~/(.*)$",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.2.2",
};

export default config;
