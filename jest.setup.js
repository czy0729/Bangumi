/*
 * @Author: czy0729
 * @Date: 2026-05-17
 */

// 全局 mock，避免每个测试文件重复声明
jest.mock('expo-asset', () => ({}))
jest.mock('expo-haptics', () => ({}))
jest.mock('mobx', () => ({
  isObservableArray: () => false
}))
jest.mock('@constants/device', () => ({
  WEB: false
}))

jest.mock(__dirname + '/src/utils/dev', () => ({
  __esModule: true,
  globalLog: jest.fn(),
  globalWarn: jest.fn(),
  rerender: jest.fn(),
  logger: {
    warn: jest.fn(),
    error: jest.fn()
  }
}))

jest.mock(
  '@utils',
  () => {
    const cheerioRN = require('cheerio-without-node-native')
    const cheerio = target =>
      typeof target === 'string' ? cheerioRN.load(target) : cheerioRN(target)

    return {
      cData: ($el, key) => $el.attr(key) || '',
      cFind: ($el, selector, index = 0) =>
        index === 'last' ? $el.find(selector).last() : $el.find(selector).eq(index),
      cHas: $el => $el.length > 0,
      cHasClass: ($el, className) => $el.hasClass(className),
      cHtml: $el => $el.html() || '',
      cEach: ($el, callback) => {
        $el.each((index, element) => callback(cheerio(element), index))
      },
      cMap: ($el, callback) =>
        $el
          .map((index, element) => callback(cheerio(element), index))
          .get()
          .filter(Boolean),
      cParse: (html, start, end) => cheerio(html.substring(html.indexOf(start), html.indexOf(end))),
      cText: $el => $el.text().trim(),
      cheerio,
      htmlMatch: (html, start, end) => html.substring(html.indexOf(start), html.indexOf(end)),
      matchAvatar: (str = '') => str.match(/url\(['"]?(.*?)['"]?\)/)?.[1] || '',
      safeObject: (object = {}) => object
    }
  },
  { virtual: true }
)
