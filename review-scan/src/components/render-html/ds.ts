/*
 * @Author: czy0729
 * @Date: 2022-07-30 15:53:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:15:07
 */
import { rc } from '@utils/dev'
import { PAD } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'RenderHtml')

/** 一些超展开内容文本样式的标记 */
export const SPAN_MARK = {
  mask: 'background-color:#555;',
  bold: 'font-weight:bold;',
  lineThrough: 'line-through;',
  hidden: 'visibility:hidden;'
} as const

/** 平板设备字体固定放大字号 */
export const PAD_FONT_ZISE_INCREASE = PAD === 2 ? 3 : 2

/** 平板设备字体固定放大行高 */
export const PAD_LINE_HEIGHT_INCREASE = PAD === 2 ? 10 : 4

/** 标签匹配规则 */
export const REGS = {
  a: /<a (.+?)<\/a>/g,
  bgm: /\(bgm|\)/g,
  divQ: /<div class="quote"><q>/g,
  fixedQ: /<\/(.+?)\.\.\.<\/span>$/,
  img: /<img/g,
  imgBr: /<br><img/g,
  media:
    // eslint-disable-next-line max-len
    /<a href="(https|http):\/\/(bgm|bangumi)\.tv\/(subject|group\/topic|rakuen\/topic\/group|character|person)\/(.+?)" target="_blank" rel="nofollow external noopener noreferrer" class="l">(.+?)<\/a>/g,
  pre: /<pre>/g,
  preR: /<\/pre>/g,
  q: /<q>(.+?)<\/q>/g,
  quote: /<div class="quote"><q(.+?)<\/q><\/div>/g,
  ruby: /<ruby>(.+?)<\/ruby>/g,
  whiteTags: /<(?!\/?(div|a|p|span|h1|h2|h3|h4|h5|strong|em|small|hr|br|q|img|ol|ul|li))/g
} as const
