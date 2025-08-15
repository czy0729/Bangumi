/*
 * @Author: czy0729
 * @Date: 2022-08-11 09:18:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 00:03:15
 */
import { Dimensions } from 'react-native'
import { HOST_AC_MEDIA } from '@constants/cdn'
import { HOST } from '@constants/constants'
import { Id, SubjectId } from '@types'

const date = new Date()

/** 源站图片域名 */
export const HOST_IMAGE = '//lain.bgm.tv'

/** 随机数因子 */
export const RANDOM_FACTOR = Number(String(date.getSeconds()).slice(0, 1))

/** 敏感字符串集 */
export const X18_TITLE = ['乳', '淫', '裏', '黄油'] as const

/** 敏感字符串集 (标签) */
export const X18_DS = [
  '18',
  'bl',
  'gal',
  'ntr',
  '伪',
  '兵',
  '成',
  '拔',
  '淫',
  '禁',
  '肉',
  '裏',
  '里',
  '黄油'
] as const

/** 年 */
export const YEAR = date.getFullYear()

/** 没有图片的标识 */
export const NO_IMGS = ['//lain.bgm.tv/pic/cover/c/', '/img/no_icon_subject.png']

/** 文字对应在应用里面的颜色 */
export const TYPE_MAP = {
  想看: 'main',
  想玩: 'main',
  想读: 'main',
  想听: 'main',
  看过: 'warning',
  玩过: 'warning',
  读过: 'warning',
  听过: 'warning',
  在看: 'primary',
  在玩: 'primary',
  在读: 'primary',
  在听: 'primary',
  搁置: 'wait',
  抛弃: 'dropped'
} as const

/** 缩写对应的站点 */
export const SITE_MAP = {
  a: 'acfun',
  b: 'bilibili',
  s: 'sohu',
  y: 'youku',
  q: 'qq',
  i: 'iqiyi',
  l: 'letv',
  p: 'pptv',
  m: 'mgtv',
  ni: 'nicovideo',
  n: 'netflix'
} as const

/** 隐私条款弹窗 key */
export const PRIVACY_STATE = 'bangumi|privacy'

export const { height: HEIGHT } = Dimensions.get('window')

export const FIND_SUBJECT_CN_CACHE_MAP = new Map<string, string>()

export const FIND_SUBJECT_JP_CACHE_MAP = new Map<string, string>()

export const X18_CACHE_MAP = new Map<SubjectId, boolean>()

export const RATING_MAP = {
  1: '不忍直视',
  2: '很差',
  3: '差',
  4: '较差',
  5: '不过不失',
  6: '还行',
  7: '推荐',
  8: '力荐',
  9: '神作',
  10: '超神作'
} as const

export const BANGUMI_URL_TEMPLATES = {
  acfun: (id: Id) => `https://www.acfun.cn/bangumi/aa${id}`,
  bangumi: (id: Id) => `${HOST}/subject/${id}`,
  bilibili: (id: Id) => `${HOST_AC_MEDIA}/md${id}/`,
  iqiyi: (id: Id) => `https://www.iqiyi.com/${id}.html`,
  letv: (id: Id) => `https://www.le.com/comic/${id}.html`,
  mgtv: (id: Id) => `https://www.mgtv.com/h/${id}.html`,
  netflix: (id: Id) => `https://www.netflix.com/title/${id}`,
  nicovideo: (id: Id) => `https://ch.nicovideo.jp/${id}`,
  pptv: (id: Id) => `http://v.pptv.com/page/${id}.html`,
  qq: (id: Id) => `https://v.qq.com/detail/${id}.html`,
  sohu: (id: Id) => `https://tv.sohu.com/${id}`,
  youku: (id: Id) => `https://list.youku.com/show/id_z${id}.html`
} as const

export const GET_AVATAR_CACHE_MAP = new Map<string, any>()
