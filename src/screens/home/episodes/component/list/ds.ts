/*
 * @Author: czy0729
 * @Date: 2024-04-18 14:38:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 10:12:36
 *
 * 章节列表组件标识与缩略图尺寸
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 缩略图宽度 */
export const IMAGE_WIDTH = _.r(116)

/** 缩略图高度, 按 16:9 取整 */
export const IMAGE_HEIGHT = Math.floor(IMAGE_WIDTH * 0.56)
