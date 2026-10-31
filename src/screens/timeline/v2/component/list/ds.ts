/*
 * @Author: czy0729
 * @Date: 2024-01-04 16:49:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-31 00:00:00
 *
 * 分页列表标识与常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 跳过进退场动画的条目数 */
export const ENTERING_EXITING_ANIMATIONS_NUM = 6
