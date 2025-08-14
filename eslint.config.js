import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.strict, eslintPluginPrettier],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-refresh': reactRefresh,
      'react-compiler': reactCompiler,
      'simple-import-sort': simpleImportSort,
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react-compiler/react-compiler': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      curly: 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'react-refresh/only-export-components': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }
);
