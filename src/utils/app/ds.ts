/*
 * @Author: czy0729
 * @Date: 2022-08-11 09:18:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 09:36:51
 */
const date = new Date()

/** 源站图片域名 */
export const HOST_IMAGE = '//lain.bgm.tv'

/** 随机数因子 */
export const RANDOM_FACTOR = Number(String(date.getSeconds()).slice(0, 1))

/** 敏感字符串集 */
export const X18_TITLE = ['乳', '妻', '淫'] as const

/** 敏感字符串集 */
export const X18_DS = [
  '里',
  '成',
  '18',
  'gal',
  'bl',
  '禁',
  '拔',
  '淫',
  '兵',
  '肉',
  '伪',
  'ntr',
  '黄油'
] as const

/** 查找条目中文名 */
export const CN_CACHES = {}

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
