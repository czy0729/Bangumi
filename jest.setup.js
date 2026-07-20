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
      getCoverSmall: (str = '') => str || '',
      HTMLDecode: (str = '') => str || '',
      HTMLToTree: () => ({ children: [] }),
      HTMLTrim: (str = '') => (str || '').trim(),
      matchAvatar: (str = '') => str.match(/url\(['"]?(.*?)['"]?\)/)?.[1] || '',
      matchUserId: (str = '') => (str || '').substring(str.lastIndexOf('/') + 1),
      safeObject: (object = {}) => object,
      trim: (str = '') => (str || '').trim()
    }
  },
  { virtual: true }
)

jest.mock(
  '@utils/fetch',
  () => ({ fetchHTML: jest.fn() }),
  { virtual: true }
)

jest.mock(
  '@utils/crypto',
  () => ({ default: { get: () => [] } }),
  { virtual: true }
)

jest.mock(
  '@utils/thirdParty/html-entities-decoder',
  () => ({ default: (str = '') => str }),
  { virtual: true }
)

jest.mock(
  '@constants',
  () => {
    const model = label => ({
      getValue: () => label
    })
    return {
      LIST_EMPTY: { list: [], pagination: { page: 0, pageTotal: 0 } },
      MODEL_BIG_EMOJI_SIZE: model('中'),
      MODEL_RAKUEN_AUTO_LOAD_IMAGE: model('0.2m'),
      MODEL_RAKUEN_NEW_FLOOR_STYLE: model('角标'),
      MODEL_RAKUEN_SCOPE: model('全局聚合'),
      MODEL_RAKUEN_SCROLL_DIRECTION: model('右侧'),
      MODEL_RAKUEN_TYPE: model('全部')
    }
  },
  { virtual: true }
)
