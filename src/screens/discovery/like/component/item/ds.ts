/*
 * @Author: czy0729
 * @Date: 2024-03-22 06:59:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 条目组件常量: 估算高度
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { IMG_HEIGHT_LG } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

/** 条目估算高度 (封面 + 上下间距), 实测后由高度缓存纠正 */
export const ITEM_HEIGHT = IMG_HEIGHT_LG + _.md * 2
