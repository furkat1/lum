import { fixupConfigRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import eslintPrettierPlugin from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import pluginJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["node_modules", "dist", "out", ".next"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "prettier/prettier": "warn",
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  ...fixupConfigRules(pluginJsxRuntime),
  ...fixupConfigRules(eslintPrettierPlugin),
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    plugins: {
      prettier: eslintPluginPrettier,
      "simple-import-sort": simpleImportSort,
    },
  },
];
