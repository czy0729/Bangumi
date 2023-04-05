/*
 * @Author: czy0729
 * @Date: 2019-03-13 05:15:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 13:33:36
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
    'max-len': ['error', 200],

    /** 允许相同变量名 */
    'no-shadow': 0,
    'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
    'react/no-did-mount-set-state': 0,
    'react/no-unstable-nested-components': 0,
    eqeqeq: 0,

    /** parseInt 允许不填进制 */
    radix: 0
  }
}
