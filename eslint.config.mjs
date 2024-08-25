// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig, // Disable conflicting ESLint rules
  {
    plugins: {
      prettier: prettierPlugin, // Enable Prettier as a plugin
    },
    rules: {
      'prettier/prettier': 'error', // Show Prettier issues as ESLint errors
    },
  },
);
