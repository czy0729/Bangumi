/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:41:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 列表布局条目组件常量: 缩略图尺寸
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemList')

/** 截图缩略图宽度 */
export const THUMB_WIDTH = _.device(114, Math.floor(_.window.contentWidth * 0.4))

/** 截图缩略图高度 */
export const THUMB_HEIGHT = Math.floor(THUMB_WIDTH * 0.56)
