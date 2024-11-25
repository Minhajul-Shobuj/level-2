import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "error",
      "no-unused-vars": "error",
      "no-unused-expression": "error",
      "no-console": "warn",
      "prefer-const": "error",
      "no-undef": "error",
    },
    ignorePatterns: ["dist", "node_modules"],
  },
];
