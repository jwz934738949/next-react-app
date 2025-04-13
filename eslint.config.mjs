import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

console.log(1234, compat.config);

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'eslint-config-prettier',
    ],
    plugins: ['prettier'],
    rules: {
      'import/order': [
        'error',
        {
          //按照分组顺序进行排序
          groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'internal', 'object', 'type'],
          //通过路径自定义分组
          pathGroups: [
            {
              pattern: 'react*',
              group: 'builtin',
              position: 'before',
            },
            {
              pattern: '@/components/**',
              group: 'parent',
              position: 'before',
            },
            {
              pattern: '@/utils/**',
              group: 'parent',
              position: 'after',
            },
            {
              pattern: '@/apis/**',
              group: 'parent',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always', //每个分组之间换行
          //根据字母顺序对每个组内的顺序进行排序
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  }),
];

export default defineConfig(eslintConfig);
