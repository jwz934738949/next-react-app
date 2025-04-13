import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import { defineConfig } from 'eslint/config';
// 导入 React 相关插件，为 JSX 和可访问性提供 ESLint 检查
import EslintPluginReact from 'eslint-plugin-react';
import EslintPluginJsxAlly from 'eslint-plugin-jsx-a11y';
// 导入 eslint-config-prettier，关闭与 Prettier 冲突的 ESLint 规则
import EslintConfigPrettier from 'eslint-config-prettier';
// 导入 TypeScript 插件和解析器，为 TypeScript 提供 ESLint 支持
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser'; // 确认导入解析器

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // 指定在代码检查时要忽略的目录
    ignores: [
      '.next/', // Next.js build output
      'node_modules/', // Node modules
      'public/', // Static files
    ],
  },
  // 将兼容的扩展配置转化为新的配置格式，包括 Next.js 和 TypeScript 的核心规则
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    languageOptions: {
      parser: tsParser, // 使用 TypeScript 的解析器
      ecmaVersion: 2020, // 支持 ECMAScript 2020 标准
      sourceType: 'module', // 使用 ES 模块语法
    },
    plugins: {
      EslintPluginReact, // 启用 React 插件以支持 JSX
      EslintPluginJsxAlly, // 启用 JSX 可访问性插件以增强无障碍检查
      '@typescript-eslint': tsPlugin, // 启用 TypeScript 插件以增强 TypeScript 检查
    },
    rules: {
      // 合并 Prettier 的规则以禁用所有与 Prettier 冲突的 ESLint 规则
      ...EslintConfigPrettier.rules,
      '@typescript-eslint/no-unused-vars': 'warn', // 对未使用的变量发出警告而不是错误
      'react/react-in-jsx-scope': 'off', // 在 React 17+ 中不再需要显式导入 React
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
  },
];

export default defineConfig(eslintConfig);
