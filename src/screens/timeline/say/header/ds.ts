/*
 * @Author: czy0729
 * @Date: 2024-01-15 20:53:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 吐槽页头部常量
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const DATA = [TEXT_MENU_BROWSER] as const

/** 显示滚动按钮所需的最少条目数 */
export const LIST_COUNT_SCROLL = 10
