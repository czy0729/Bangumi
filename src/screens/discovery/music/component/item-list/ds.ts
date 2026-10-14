/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 列表布局条目组件常量
 */
import { rc } from '@utils/dev'
import { IMG_WIDTH_LG } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemList')

/** 正方形封面边长 (专辑封面, IMG_WIDTH_LG × 1.28) */
export const IMG_SIZE = Math.floor(IMG_WIDTH_LG * 1.28)
