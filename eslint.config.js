import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname, // optional; default: process.cwd()
  resolvePluginsRelativeTo: __dirname, // optional
});

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...compat.extends('airbnb'),
      ...compat.extends('prettier'),
    ],
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      quotes: [2, 'single', { avoidEscape: true }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'function-declaration',
          unnamedComponents: 'arrow-function',
        },
      ],
      'arrow-body-style': ['error', 'as-needed'],
      'no-unused-vars': 'error',
      'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.tsx'] }],
      'import/no-unresolved': 'error',
      'import/no-duplicates': 'error',
      'react/prop-types': 'off',
      'react/no-this-in-sfc': 'error',
      'no-useless-call': 'error',
      'no-nested-ternary': 'off',
      'no-useless-return': 'error',
      'no-console': ['warn', { allow: ['log', 'warn', 'error'] }],
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Built-in Node.js modules
            'external', // External modules from node_modules
            'internal', // Internal packages
            ['sibling', 'parent'], // Parent and sibling modules
            'index', // Index files
            'unknown', // Unknown group
          ],
          pathGroupsExcludedImportTypes: ['builtin', 'external'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }
);
