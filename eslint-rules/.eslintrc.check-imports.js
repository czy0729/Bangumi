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
  // 覆盖根 .eslintrc.js 合并进来的 project, 本配置只做 no-undef 检查, 无需 TS 类型信息
  // (tsconfig exclude 了 src/assets, 不禁用会导致部分 .web.ts 报解析错误)
  parserOptions: {
    project: null
  },
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
    DOMElement: true,
    IntersectionObserver: true,
    URLSearchParams: true,
    document: true,
    fetch: true,
    global: true,
    location: true,
    log: true,
    navigator: true,
    rerender: true,
    warn: true,
    window: true
  },
  rules: {
    'no-undef': 'error',

    // project 已禁用, 根配置合并进来的 typed 规则无法加载, 全部关闭
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-unsafe-return': 0
  }
}
