import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config([
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  js.configs.recommended,
  ...tseslint.configs.strict,
  eslintPluginPrettier,

  { ignores: ['dist'] },

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'react/jsx-no-useless-fragment': 'error',
      'react-refresh/only-export-components': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      curly: 'error',
      'react/jsx-no-literals': ['error', { allowedStrings: ['<///>', ': '] }],
      'no-restricted-imports': [
        'error',
        {
          name: 'next/link',
          message: 'Please import from `@/i18n/navigation` instead.',
        },
        {
          name: 'next/navigation',
          importNames: ['redirect', 'permanentRedirect', 'useRouter', 'usePathname'],
          message: 'Please import from `@/i18n/navigation` instead.',
        },
      ],
    },
  },
]);
