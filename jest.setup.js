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
    const { lastDate, relativeEnToEpoch, relativeToEpoch } = require(
      __dirname + '/src/utils/utils/relative-time'
    )
    const { htmlMatch } = require(__dirname + '/src/utils/html/match')
    const { cEach, cPagination, cText } = require(__dirname + '/src/utils/html/parse')

    function desc(a, b, fn) {
      const _a = typeof fn === 'function' ? fn(a) : a
      const _b = typeof fn === 'function' ? fn(b) : b
      if (typeof _a === 'string' && typeof _b === 'string') {
        return _a < _b ? 1 : _a > _b ? -1 : 0
      }
      if (_a === _b) return 0
      if (_a > _b) return -1
      return 1
    }
    function freeze(val) {
      return Object.freeze(val)
    }
    function getOnAir(onAir, onAirUser) {
      function getSafeValue(key, ...sources) {
        for (const s of sources) {
          if (s?.[key] !== undefined && s[key] !== '') return s[key]
        }
        return undefined
      }
      function isNull(v) {
        return v === undefined || v === '' || v === null
      }
      const timeJP = getSafeValue('timeJP', onAir, onAirUser)
      const timeCN = getSafeValue('timeCN', onAir, onAirUser)
      const time = isNull(timeCN) ? timeJP : timeCN
      const weekDayJP = getSafeValue('weekDayJP', onAir, onAirUser)
      const weekDayCN = getSafeValue('weekDayCN', onAir, onAirUser)
      const weekDay = isNull(weekDayCN) ? weekDayJP : weekDayCN
      const isOnair = !!(weekDay !== undefined && weekDay !== '' && (timeCN || timeJP))
      const h = typeof time === 'string' ? time.slice(0, 2) : ''
      const m = typeof time === 'string' ? time.slice(2, 4) : ''
      const isCustom = !!onAirUser?._loaded
      return { weekDay, h, m, isOnair, isExist: weekDay !== undefined && weekDay !== '', isCustom }
    }

    return {
      cData: ($el, key) => $el.attr(key) || '',
      cFind: ($el, selector, index = 0) =>
        index === 'last' ? $el.find(selector).last() : $el.find(selector).eq(index),
      cHas: $el => $el.length > 0,
      cHasClass: ($el, className) => $el.hasClass(className),
      cHtml: $el => $el.html() || '',
      cEach,
      cMap: ($el, callback) =>
        $el
          .map((index, element) => callback(cheerio(element), index))
          .get()
          .filter(Boolean),
      cParse: (html, start, end) => cheerio(htmlMatch(html, start, end)),
      cText,
      cPagination,
      cheerio,
      htmlMatch,
      getCoverSmall: (str = '') => str || '',
      HTMLDecode: (str = '') => str || '',
      HTMLToTree: () => ({ children: [] }),
      HTMLTrim: (str = '') =>
        (str || '')
          .replace(/\n+|\s\s\s*|\t/g, '')
          .replace(/> </g, '><')
          .trim(),
      matchAvatar: (str = '') => str.match(/url\(['"]?(.*?)['"]?\)/)?.[1] || '',
      matchUserId: (str = '') => (str || '').substring(str.lastIndexOf('/') + 1),
      lastDate,
      relativeToEpoch,
      relativeEnToEpoch,
      safeObject: (object = {}) => object,
      desc,
      freeze,
      getOnAir,
      findLastIndex: () => -1,
      getPinYinFilterValue: () => '',
      x18: () => false,
      trim: (str = '') => (str || '').trim()
    }
  },
  { virtual: true }
)

jest.mock('@utils/fetch', () => ({ fetchHTML: jest.fn() }), { virtual: true })

jest.mock('@utils/crypto', () => ({ default: { get: () => [] } }), { virtual: true })

jest.mock(
  '@stores',
  () => {
    // mutable cell for dynamic homeSortSink
    const state = { homeSortSink: false }
    global.__mockStoreState__ = state
    return {
      systemStore: {
        setting: {
          homeSorting: '',
          get homeSortSink() {
            return global.__mockStoreState__.homeSortSink
          }
        }
      },
      userStore: {
        userProgress: () => ({})
      },
      _: {
        r: v => v,
        window: { width: 375, height: 812 }
      }
    }
  },
  { virtual: true }
)

jest.mock(
  '@src/screens/user/origin-setting/utils',
  () => ({
    getOriginConfig: jest.fn()
  }),
  { virtual: true }
)

jest.mock('@utils/thirdParty/html-entities-decoder', () => ({ default: (str = '') => str }), {
  virtual: true
})

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
