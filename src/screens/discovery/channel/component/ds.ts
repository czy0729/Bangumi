/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:23:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 区块常量: 卡片间距与遮罩高度
 *
 * 间距口径: 版块之间 _.mt.lg; 版块标题与内容 / 卡片内边距 / 卡片之间的间距统一用下方常量; 页面左右边距 _.wind
 */
import { rc } from '@utils/dev'
import { _ } from '@stores'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Component')

/** 卡片内边距、版块标题与内容的间距 */
export const CARD_PADDING = _.sm + _.xs

/** 卡片之间的间距 */
export const GAP = _.sm + _.xs

/** 卡片高度比例 */
export const COVER_RATIO = 1.4

/** 卡片文字遮罩 / 无图兜底渐变高度 */
export const SCRIM_HEIGHT = 96

/** 小卡片文字遮罩高度 */
export const SCRIM_HEIGHT_SM = 64
