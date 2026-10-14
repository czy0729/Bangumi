/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:23:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 人物近况组件常量: 封面尺寸
 */
import { rc } from '@utils/dev'
import { IMG_HEIGHT_LG, IMG_WIDTH_LG } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemRecents')

/** 封面宽度 */
export const COVER_WIDTH = IMG_WIDTH_LG

/** 封面高度 */
export const COVER_HEIGHT = IMG_HEIGHT_LG
