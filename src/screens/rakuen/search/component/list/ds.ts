/*
 * @Author: czy0729
 * @Date: 2024-05-08 00:10:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

/** 需进场动画的列表项数量 */
export const ENTERING_ANIMATIONS_NUM = 10
