/*
 * @Author: czy0729
 * @Date: 2024-09-02 12:03:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 05:51:05
 */
import { ImageRequireSource } from 'react-native'
import PropTypes from 'prop-types'
import { HOST_DOGE } from '../cdn/ds'
import { PAD, RATIO, WEB } from '../device'
import { IOS } from './env'

/** @deprecated Bangumi 字眼在 App 内的显示 */
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
export const IMG_DEFAULT = WEB
  ? DOGE_CDN_IMG_DEFAULT
  : (require('@assets/images/default.png') as ImageRequireSource)

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

const h = (w: any) => parseInt(String(w * 1.4))

/** 头像大小 */
export const IMG_AVATAR_WIDTH = 32

/** 封面宽度 */
export const IMG_WIDTH = parseInt(String(RATIO * 82))

/** 封面高度 */
export const IMG_HEIGHT = h(IMG_WIDTH)

/** 封面宽度 (小) */
export const IMG_WIDTH_SM = parseInt(String(RATIO * 72))

/** 封面高度 (小) */
export const IMG_HEIGHT_SM = h(IMG_WIDTH_SM)

/** 封面宽度 (大) */
export const IMG_WIDTH_LG = parseInt(String(IMG_WIDTH * 1.34))

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
export const LIST_EMPTY = {
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

/** App 事件埋点数据结构 */
export const EVENT = {
  id: '',
  data: {}
} as const

/** 时间数组 */
export const DATA_AIRTIME = [
  '全部',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
  '1999',
  '1998',
  '1997',
  '1996',
  '1995',
  '1994',
  '1993',
  '1992',
  '1991',
  '1990',
  '1989',
  '1988',
  '1987',
  '1986',
  '1985',
  '1984',
  '1983',
  '1982',
  '1981',
  '1980'
] as const

/** 月份数组 */
export const DATA_MONTH = [
  '全部',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12'
] as const

/** 索引年数组 */
export const DATA_BROWSER_AIRTIME = [
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
  '1999',
  '1998',
  '1997',
  '1996',
  '1995',
  '1994',
  '1993',
  '1992',
  '1991',
  '1990',
  '1989',
  '1988',
  '1987',
  '1986',
  '1985',
  '1984',
  '1983',
  '1982',
  '1981',
  '1980',
  '1979',
  '1978',
  '1977',
  '1976',
  '1975',
  '1974',
  '1973',
  '1972',
  '1971',
  '1970',
  '1969',
  '1968',
  '1967',
  '1966',
  '1965',
  '1964',
  '1963',
  '1962',
  '1961',
  '1960',
  '1959',
  '1958',
  '1957',
  '1956',
  '1955',
  '1954',
  '1953',
  '1952',
  '1951',
  '1950',
  '1949'
] as const

/** 索引时间月数组 */
export const DATA_BROWSER_MONTH = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12'
] as const

/** 字母表数组 */
export const DATA_ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
] as const

/** 1 小时 */
export const H = 60 * 60

/** 6 小时 */
export const H6 = H * 6

/** 12 小时 */
export const H12 = H * 12

/** 1 天 */
export const D = H * 24

/** 1 天 */
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
  showsVerticalScrollIndicator: false
} as const
