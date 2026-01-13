import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    ignores: ["eslint.config.js"]
  },
  {
    rules: {
      "quotes": [2, "single", { "avoidEscape": true }],
      "jsx-quotes": ["error", "prefer-double"],
      "linebreak-style": 0,
      'react/react-in-jsx-scope': 'off',
      'no-console': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'consistent-return': 'off',
      'object-curly-spacing': ['error', 'always'],
      'keyword-spacing': ['error', {
        overrides: {
          if: { after: false },
        },
      }],
      semi: 2,
      indent: [
        'error',
        2,
      ],
      'max-len': [
        'error',
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
        },
      ]
    }
  }
];  