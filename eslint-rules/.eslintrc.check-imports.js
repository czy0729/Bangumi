/*
 * @Author: czy0729
 * @Date: 2025-10-17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:54:57
 * @Description: 只检查变量是否未引入就使用 (no-undef)
 */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    '/components/@/*',
    '/eslint-rules',
    '/node_modules',
    '/src/types/global.d.ts',
    '/src/utils/thirdParty/*',
    'babel.config.js',
    'jsconfig.json'
  ],
  globals: {
    JSX: true,
    global: true,
    log: true,
    rerender: true,
    warn: true
  },
  rules: {
    'no-undef': 'error'
  }
}
