/*
 * @Author: czy0729
 * @Date: 2019-03-13 05:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-29 16:24:50
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: ['@react-native-community', 'prettier'],
  ignorePatterns: [
    '/node_modules',
    '/components/@/*',
    '/src/utils/thirdParty/*',
    'babel.config.js',
    'jsconfig.json'
  ],
  globals: {
    global: true,
    rerender: true,
    warn: true,
    log: true,
    JSX: true
  },
  rules: {
    '@typescript-eslint/no-shadow': 0,
    '@typescript-eslint/no-unused-vars': [2, { ignoreRestSiblings: true }],
    // '@typescript-eslint/no-explicit-any': 'warn',
    'max-len': ['error', 200],
    'no-shadow': 0, // 允许相同变量名
    'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    'react/no-did-mount-set-state': 0,
    'react/no-unstable-nested-components': 0,
    eqeqeq: 0,
    radix: 0 // parseInt允许不填进制
  }
}
