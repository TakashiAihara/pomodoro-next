/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "standard-with-typescript",
    "plugin:react/recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:storybook/recommended",
  ],
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ["**/*.js", "react-app-env.d.ts", "prettier.config.*js"],
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
  plugins: ["react", "react-hooks"],
  rules: {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
