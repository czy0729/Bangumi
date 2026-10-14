/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:23:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 头部组件常量: 菜单项
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const DATA = [TEXT_MENU_BROWSER] as const
