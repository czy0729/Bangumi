/*
 * @Author: czy0729
 * @Date: 2019-03-13 05:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-17 00:05:56
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'react-hooks', 'prettier', 'bangumi'],
  ignorePatterns: [
    '/components/@/*',
    '/eslint-rules',
    '/node_modules',
    '/src/utils/thirdParty/*',
    'babel.config.js',
    'jsconfig.json'
  ],
  globals: {
    JSX: true,
    Proxy: true,
    React: true,
    Response: true,
    URL: true,
    XMLHttpRequest: true,
    __DEV__: true,
    clearInterval: true,
    clearTimeout: true,
    console: true,
    fetch: true,
    global: true,
    globalThis: true,
    log: true,
    performance: true,
    process: true,
    requestAnimationFrame: true,
    require: true,
    rerender: true,
    setInterval: true,
    setTimeout: true,
    warn: true,
    window: true
  },
  overrides: [
    {
      files: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
      env: {
        jest: true,
        node: true
      }
    }
  ],
  rules: {
    /** 允许变量与外部作用域同名 */
    '@typescript-eslint/no-shadow': 0,

    /** 禁止未使用的变量 */
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        ignoreRestSiblings: true
      }
    ],

    /** 强制类型使用 import type */
    '@typescript-eslint/consistent-type-imports': [
      'warn',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
        fixStyle: 'inline-type-imports'
      }
    ],

    /** 单行最大长度 200 */
    'max-len': ['error', 200],

    /** 允许相同变量名 */
    'no-shadow': 0,

    /** 禁止 console，警告级别 */
    'no-console': ['warn'],

    /** 优先使用 const */
    'prefer-const': [
      'error',
      {
        ignoreReadBeforeAssign: true
      }
    ],

    /** 允许在 didMount 中 setState */
    'react/no-did-mount-set-state': 0,

    /** 允许嵌套组件 */
    'react/no-unstable-nested-components': 0,

    /** 允许使用 == */
    eqeqeq: 0,

    /** parseInt 允许不填进制 */
    radix: 0,

    /** 设置最大嵌套深度 */
    'max-depth': ['warn', 5],

    /** useEffect 依赖检查 */
    'react-hooks/exhaustive-deps': 'warn',

    /** memoStyles 中要求使用 computed */
    'bangumi/require-computed-in-memo-styles': 'warn',

    /** create 中禁止使用 computed */
    'bangumi/forbid-computed-in-create': 'warn',

    /** 禁止未使用的样式 key */
    'bangumi/no-unused-style-key': 'warn',

    /** 样式值小数应取整 */
    'bangumi/floor-decimal-in-styles': 'warn'
  }
}
