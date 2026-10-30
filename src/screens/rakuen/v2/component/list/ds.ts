/*
 * @Author: czy0729
 * @Date: 2024-01-04 17:47:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 板块列表标识与常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 跳过进退场动画的条目数 */
export const ENTERING_EXITING_ANIMATIONS_NUM = 10

/** 首次渲染条数 */
export const INITIAL_NUM_TO_RENDER = 16
