/*
 * @Author: czy0729
 * @Date: 2024-09-02 12:03:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 07:07:53
 */
import { ImageRequireSource } from 'react-native'
import PropTypes from 'prop-types'
import { ListEmpty } from '@types'
import { HOST_DOGE } from '../cdn/ds'
import { PAD, RATIO, WEB } from '../device'
import { IOS } from './env'

/** @deprecated Bangumi 字眼在 APP 内的显示 */
export const TITLE = IOS ? 'bgm.tv' : 'Bangumi'

/** 占位底图 */
export const IMG_EMPTY = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAA1BMVEX///+nxBvIAAAAKklEQVR42u3BgQAAAADDoPtTH2AK1QAAAAAAAAAAAAAAAAAAAAAAAACAOE+wAAFrRnPdAAAAAElFTkSuQmCC'
} as const

/** 占位底图 (黑) */
export const IMG_EMPTY_DARK = {
  uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAQMAAAC6caSPAAAAA1BMVEU+PkC+lq+tAAAAKklEQVR42u3BgQAAAADDoPtTH2AK1QAAAAAAAAAAAAAAAAAAAAAAAACAOE+wAAFrRnPdAAAAAElFTkSuQmCC'
} as const

/** 空头像 */
export const IMG_DEFAULT_AVATAR = '//lain.bgm.tv/pic/user/s/icon.jpg'

/** 默认图 */
export const DOGE_CDN_IMG_DEFAULT = `${HOST_DOGE}/assets/default.png`

/** 默认图 */
export const IMG_DEFAULT = require('@assets/images/default.png') as ImageRequireSource

/** 默认用户头像 */
export const IMG_AVATAR_DEFAULT = WEB
  ? 'https://lain.bgm.tv/pic/user/l/icon.jpg'
  : (require('@assets/images/l.png') as ImageRequireSource)

/** 默认角色缩略图 */
export const IMG_INFO_ONLY = WEB
  ? 'https://bgm.tv/img/info_only.png'
  : (require('@assets/images/info_only.png') as ImageRequireSource)

/** 默认条目缩略图 */
export const IMG_SUBJECT_ONLY = 'https://bgm.tv/img/no_icon_subject.png'

const h = (w: any) => Math.floor(w * 1.4)

/** 头像大小 */
export const IMG_AVATAR_WIDTH = 32

/** 封面宽度 */
export const IMG_WIDTH = Math.floor(RATIO * 82)

/** 封面高度 */
export const IMG_HEIGHT = h(IMG_WIDTH)

/** 封面宽度 (小) */
export const IMG_WIDTH_SM = Math.floor(RATIO * 72)

/** 封面高度 (小) */
export const IMG_HEIGHT_SM = h(IMG_WIDTH_SM)

/** 封面宽度 (大) */
export const IMG_WIDTH_LG = Math.floor(IMG_WIDTH * 1.34)

/** 封面高度 (大) */
export const IMG_HEIGHT_LG = h(IMG_WIDTH_LG)

/** GMT+0800 的偏移量 */
export const TIMEZONE_OFFSET_GMT8 = -480

/** 本地时区的偏移量 */
export const TIMEZONE_OFFSET_LOCAL = new Date().getTimezoneOffset()

/** 本地时区是否 GMT+0800 */
export const TIMEZONE_IS_GMT8 = TIMEZONE_OFFSET_LOCAL === TIMEZONE_OFFSET_GMT8

/** 硬件加速 */
export const USE_NATIVE_DRIVER = !WEB

/** App 列表数据结构 */
export const LIST_EMPTY: ListEmpty = {
  list: [],
  pagination: {
    page: 0,
    pageTotal: 0
  },

  /** 用于某些方法制造分页效果 */
  _list: [],
  _loaded: false as boolean | number
}

/** 用于制造分页数据 */
export const LIMIT_LIST = 100

/** 用于制造分页数据 (评论) */
export const LIMIT_LIST_COMMENTS = 24

/** 对评论数多的帖子进行网页跳转 */
export const LIMIT_TOPIC_PUSH = 500

/** 部分首屏渲染任务非常重的页面设置的初始最大项显示值 */
export const LIMIT_HEAVY_RENDER = 10

/** 事件埋点数据结构 */
export const EVENT = {
  id: '',
  data: {}
} as const

/** 时间 */
export const DATA_AIRTIME = (() => {
  const currentYear = new Date().getFullYear()
  const years = ['全部']
  for (let year = currentYear; year >= 1980; year--) {
    years.push(year.toString())
  }
  return years
})()

/** 月份 */
export const DATA_MONTH = [
  '全部',
  ...Array.from({ length: 12 }, (_, i) => (i + 1).toString())
] as const

/** 来源 */
export const DATA_SOURCE = ['全部', '原创', '漫画改', '游戏改', '小说改'] as const

/** 动画类型公共标签 */
export const DATA_ANIME_TAG = [
  '全部',
  '科幻',
  '喜剧',
  '百合',
  '校园',
  '惊悚',
  '后宫',
  '机战',
  '悬疑',
  '恋爱',
  '奇幻',
  '推理',
  '运动',
  '耽美',
  '音乐',
  '战斗',
  '冒险',
  '萌系',
  '穿越',
  '玄幻',
  '乙女',
  '恐怖',
  '历史',
  '日常',
  '剧情',
  '武侠',
  '美食',
  '职场'
] as const

/** 动画地区 */
export const DATA_ANIME_AREA = [
  '全部',
  '欧美',
  '日本',
  '美国',
  '中国',
  '法国',
  '韩国',
  '俄罗斯',
  '英国',
  '苏联',
  '中国香港',
  '捷克',
  '中国台湾'
] as const

/** 动画受众 */
export const DATA_ANIME_TARGET = [
  '全部',
  'BL',
  'GL',
  '子供向',
  '女性向',
  '少女向',
  '少年向',
  '青年向'
] as const

/** 游戏类型公共标签 */
export const DATA_GAME_TAG = [
  '全部',
  'AAVG',
  'ACT',
  'ADV',
  'ARPG',
  'AVG',
  'CRPG',
  'DBG',
  'DRPG',
  'EDU',
  'FPS',
  'FTG',
  'Fly',
  'Horror',
  'JRPG',
  'MMORPG',
  'MOBA',
  'MUG',
  'PUZ',
  'Platform',
  'RAC',
  'RPG',
  'RTS',
  'RTT',
  'Roguelike',
  'SIM',
  'SLG',
  'SPG',
  'SRPG',
  'STG',
  'Sandbox',
  'Survival',
  'TAB',
  'TPS',
  'VN',
  '休闲',
  '卡牌对战'
] as const

/** 游戏受众 */
export const DATA_GAME_TARGET = ['全部', 'Galgame', 'BL', '乙女'] as const

/** 游戏分级 */
export const DATA_CLASSIFICATION = ['全部', '全年龄', 'R18'] as const

/** 三次元题材 */
export const DATA_THEME = [
  '全部',
  '犯罪',
  '悬疑',
  '推理',
  '喜剧',
  '爱情',
  '特摄',
  '科幻',
  '音乐',
  '校园',
  '美食',
  '奇幻',
  '动作',
  '家庭',
  '战争',
  '玄幻',
  '西部',
  '歌舞',
  '历史',
  '传记',
  '剧情',
  '纪录片',
  '恐怖',
  '惊悚',
  '职场',
  '武侠',
  '古装',
  '布袋戏',
  '灾难',
  '冒险',
  '少儿',
  '运动',
  '同性'
] as const

/** 三次元地区 */
export const DATA_REAL_AREA = [
  '全部',
  '日本',
  '欧美',
  '美国',
  '中国',
  '华语',
  '英国',
  '韩国',
  '中国香港',
  '中国台湾',
  '法国',
  '俄罗斯',
  '意大利',
  '加拿大',
  '新西兰',
  '泰国'
] as const

/** 索引年 */
export const DATA_BROWSER_AIRTIME = (() => {
  const currentYear = new Date().getFullYear()
  const years: string[] = []
  for (let year = currentYear; year >= 1949; year--) {
    years.push(year.toString())
  }
  return years
})()

/** 索引时间月 */
export const DATA_BROWSER_MONTH = Array.from({ length: 12 }, (_, i) => (i + 1).toString())

/** 字母表 */
export const DATA_ALPHABET = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))

/** 公共标签 */
export const DATA_META = ['公共标签', '用户标签'] as const

/** 1 分钟 */
export const M1 = 60

/** 2 分钟 */
export const M2 = M1 * 2

/** 5 分钟 */
export const M5 = M1 * 5

/** 1 小时 */
export const H1 = 60 * 60

/** 1 小时 */
export const H = H1

/** 6 小时 */
export const H6 = H * 6

/** 12 小时 */
export const H12 = H * 12

/** 1 天 */
export const D1 = H * 24

/** 1 天 */
export const D = D1

/** 3 天 */
export const D3 = D * 3

/** 7 天 */
export const D7 = D * 7

/** 1 亿 */
export const B = 100000000

/** 1 万 */
export const M = 10000

/** 允许显示的源头 */
export const SITES = ['bilibili', 'qq', 'iqiyi', 'acfun', 'youku'] as const

/** 所有源头 */
export const SITES_DS = [
  'acfun',
  'bilibili',
  'sohu',
  'youku',
  'qq',
  'iqiyi',
  'letv',
  'pptv',
  'mgtv',
  'nicovideo',
  'netflix'
] as const

/** @deprecated 制造 [已收藏] 前面的占位 */
export const COLLECTION_INDENT = PAD ? '　　    ' : '　　   '

/** 页面通用 context */
export const contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object,
  route: PropTypes.object
} as const

/** 抹平 ScrollView 跨平台不同表现参数 */
export const SCROLL_VIEW_RESET_PROPS = {
  alwaysBounceHorizontal: false,
  alwaysBounceVertical: false,
  overScrollMode: 'never',
  showsHorizontalScrollIndicator: false,
  showsVerticalScrollIndicator: false,
  directionalLockEnabled: true
} as const
