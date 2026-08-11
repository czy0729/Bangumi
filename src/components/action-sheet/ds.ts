/*
 * @Author: czy0729
 * @Date: 2024-01-14 04:26:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 06:45:37
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ActionSheet')

/** 下拉超过 px 就收起 */
export const DRAG_THRESHOLD = 72

/** 菜单项高度 */
export const BTN_HEIGHT = 44
