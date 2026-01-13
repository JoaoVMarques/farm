import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

/** @type {import("eslint").ESLint.Config[]} */
export default [
  /* ===========================
   * 📦 CONFIGS BASE
   * =========================== */
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,

  /* ===========================
   * 🎯 CONFIG DO PROJETO
   * =========================== */
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    ignores: ["eslint.config.js"],

    languageOptions: {
      globals: globals.browser,
    },

    rules: {
      /* ===========================
       * 🧼 ESTILO & FORMATAÇÃO
       * =========================== */
      "quotes": ["error", "single", { avoidEscape: true }],
      "semi": ["error", "always"],
      "indent": ["error", 2],
      "max-len": [
        "error",
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
        },
      ],

      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 1 }],
      "comma-spacing": ["error", { before: false, after: true }],
      "comma-dangle": ["error", "always-multiline"],
      "space-infix-ops": "error",
      "operator-linebreak": ["error", "before"],
      "keyword-spacing": ["error", { before: true, after: true }],
      "jsx-quotes": ["error", "prefer-double"],

      /* ===========================
       * 📐 CONSISTÊNCIA DE CÓDIGO
       * =========================== */
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "one-var": ["error", "never"],
      "no-unreachable": "error",
      "space-before-blocks": ["error", "always"],

      /* ===========================
       * ⚛️ REACT & JSX
       * =========================== */
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      "react/jsx-curly-spacing": [
        "error",
        {
          when: "always",
          children: true,
        },
      ],

      "react/jsx-max-props-per-line": [
        "error",
        {
          maximum: 1,
          when: "multiline",
        },
      ],

      "react/jsx-key": "error",

      /* ===========================
       * 🧠 PRAGMATISMO (DEV EXPERIENCE)
       * =========================== */
      "no-console": "off",
      "consistent-return": "off",
      "linebreak-style": "off",
    },
  },

  {
  settings: {
    react: {
      version: "detect",
      },
    },
  }
];
