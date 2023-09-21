/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "standard-with-typescript",
    "prettier",
    "next/core-web-vitals",
    "plugin:storybook/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [
    "**/*.js",
    "**/*.jsx",
    "react-app-env.d.ts",
    "prettier.config.*js",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false,
    project: ["./tsconfig.json"],
  },
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  root: true,
};
