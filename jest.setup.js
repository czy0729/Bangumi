/*
 * @Author: czy0729
 * @Date: 2026-05-17
 */

// 全局 mock，避免每个测试文件重复声明
jest.mock('expo-asset', () => ({}))
jest.mock('expo-constants', () => ({
  appOwnership: 'expo',
  statusBarHeight: 0,
  getWebViewUserAgentAsync: jest.fn()
}))
jest.mock('expo-haptics', () => ({}))
jest.mock('mobx', () => ({
  isObservableArray: () => false
}))
jest.mock('@constants/device', () => ({
  WEB: false
}))

// 完整覆盖 src/utils/dev 全部导出, 测试文件无需再局部 mock;
// 需断言日志时直接 import { logger } from '@utils/dev' (mock 按 resolved 路径注册, 相对路径导入同样生效)
jest.mock(__dirname + '/src/utils/dev', () => ({
  __esModule: true,
  globalLog: jest.fn(),
  globalWarn: jest.fn(),
  rerender: jest.fn(),
  r: jest.fn(),
  rc: (_parent, name) => String(name),
  now: () => '00:00:00',
  ll: jest.fn(),
  log: jest.fn(),
  fill: (str = '') => String(str),
  logger: {
    log: jest.fn(),
    info: jest.fn(),
    success: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    yellow: jest.fn(),
    purple: jest.fn()
  }
}))

jest.mock(
  '@utils',
  () => {
    const cheerioRN = require('cheerio-without-node-native')
    const cheerio = target =>
      typeof target === 'string' ? cheerioRN.load(target) : cheerioRN(target)
    const { lastDate, relativeEnToEpoch, relativeToEpoch } = require(__dirname +
      '/src/utils/utils/relative-time')
    const { t2s } = require(__dirname + '/src/utils/thirdParty/cn-char')
    const { htmlMatch } = require(__dirname + '/src/utils/html/match')
    const { cEach, cPagination, cText, HTMLDecode } = require(__dirname + '/src/utils/html/parse')
    const { removeHTMLTag, HTMLTrim } = require(__dirname + '/src/utils/html/tag')
    const { asc, desc } = require(__dirname + '/src/utils/utils/sort')
    const { safeObject, titleCase, trim } = require(__dirname + '/src/utils/utils/base')
    const { matchAvatar, matchUserId } = require(__dirname + '/src/utils/match')

    // freeze / cnjp / getOnAir 真实实现依赖 store 设置或 toLocal, 保持语义等价的简化实现
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
      asc,
      desc,
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
      getCoverMedium: src => src,
      getCover400: src => src,
      getTimestamp: () => 1000000,
      navigationReference: jest.fn(),
      HTMLDecode,
      removeHTMLTag,
      cnjp: (cn, jp) => cn || jp || '',
      t2s,
      HTMLToTree: () => ({ children: [] }),
      HTMLTrim,
      matchAvatar,
      matchUserId,
      lastDate,
      relativeToEpoch,
      relativeEnToEpoch,
      safeObject,
      freeze,
      getOnAir,
      findLastIndex: () => -1,
      getPinYinFilterValue: () => '',
      x18: () => false,
      trim,
      getStorage: jest.fn(),
      setStorage: jest.fn(),
      titleCase
    }
  },
  { virtual: true }
)

jest.mock(
  '@utils/fetch',
  () => ({
    fetchHTML: jest.fn(),
    baiduTranslate: jest.fn(),
    t: jest.fn()
  }),
  { virtual: true }
)

jest.mock(
  '@utils/proxy',
  () => ({
    applyProxy: jest.fn(url => url),
    logProxy: jest.fn(),
    applyProxyToAxiosConfig: jest.fn(config => config),
    axiosWithProxy: jest.fn(),
    axiosWithProxyRedirect: jest.fn(),
    applyLainProxy: jest.fn(url => url)
  }),
  { virtual: true }
)

jest.mock('@utils/async', () => ({ syncUserStore: jest.fn() }), { virtual: true })

jest.mock('@utils/thirdParty', () => ({ axios: jest.fn() }), { virtual: true })

// 同时提供 default 与命名导出, constants/cdn/ds.ts 等消费方使用 import { get } 命名导入;
// 返回 JSON 字符串 '[]', 兼容 constants/model/news.ts 的 JSON.parse(get(...)) 用法
jest.mock('@utils/crypto', () => ({
  __esModule: true,
  default: { get: () => '[]', set: () => '' },
  get: () => '[]',
  set: () => ''
}))

jest.mock('@assets/json', () => ({ loadJSON: jest.fn() }))

jest.mock(
  '@stores',
  () => {
    // mutable cell for dynamic homeSortSink / uiStore.isScrolling
    const state = { homeSortSink: false, isScrolling: false }
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
      uiStore: {
        get isScrolling() {
          return global.__mockStoreState__.isScrolling
        },
        setScrolling: jest.fn()
      },
      userStore: {
        userProgress: () => ({})
      },
      _: {
        r: v => v,
        window: { width: 375, height: 812 },
        // 与 src/stores/theme/action.ts 真实实现语义一致 (测试环境 PAD 未定义恒为手机)
        device: (mobileValue, padValue) => mobileValue,
        // 与 src/stores/theme/computed.ts 一致: create 即 StyleSheet.create
        create: styles => styles,
        absoluteFill: {
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
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
    // 与 src/constants/model/utils.ts 的 Model 语义一致
    const model2 = data => ({
      getLabel: value => data.find(i => i.value == value || i.title == value)?.label || false,
      getValue: label => data.find(i => i.label == label || i.title == label)?.value || false,
      getTitle: label => data.find(i => i.label == label || i.value == label)?.title || false
    })
    return {
      HOST_IMAGE: '//lain.bgm.tv',
      HOST_CDN_AVATAR: 'https://cdn.example.com',
      IMG_AVATAR_DEFAULT: 'IMG_AVATAR_DEFAULT',
      IMG_DEFAULT: 'IMG_DEFAULT',
      UA: 'UA',
      URL_DEFAULT_AVATAR: '/icon.jpg',
      URL_DEFAULT_MONO: '/info_only.png',
      LIST_EMPTY: { list: [], pagination: { page: 0, pageTotal: 0 } },
      FROZEN_FN: () => {},
      LIKE_TYPE_RAKUEN: 8,
      LIKE_TYPE_TIMELINE: 40,
      LIKE_TYPE_SAY: 50,
      MODEL_COLLECTION_STATUS: model2([
        { label: '想看', value: 'wish', title: '1' },
        { label: '看过', value: 'collect', title: '2' },
        { label: '在看', value: 'do', title: '3' },
        { label: '搁置', value: 'on_hold', title: '4' },
        { label: '抛弃', value: 'dropped', title: '5' }
      ]),
      MODEL_BIG_EMOJI_SIZE: model('中'),
      MODEL_RAKUEN_AUTO_LOAD_IMAGE: model('0.2m'),
      MODEL_RAKUEN_NEW_FLOOR_STYLE: model('角标'),
      MODEL_RAKUEN_SCOPE: model('全局聚合'),
      MODEL_RAKUEN_SCROLL_DIRECTION: model('右侧'),
      MODEL_RAKUEN_TYPE: model('全部'),
      D: 86400,
      D3: 259200,
      D7: 604800,

      // barrel 导出的埋点事件表; 消费方 (web-view log detail 等) 会在模块顶层
      // 对它做 Object.entries, 缺失会得到 undefined 并抛错, 故提供空对象兜底
      EVENTS: {}
    }
  },
  { virtual: true }
)
