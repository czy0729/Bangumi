/*
 * @Author: czy0729
 * @Date: 2024-01-11 05:18:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 头部组件标识与右上角菜单项
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPA, WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

/** 右上角菜单项, WEB 下不含 SPA 入口 */
export const DATA = WEB ? [TEXT_MENU_BROWSER] : [TEXT_MENU_BROWSER, TEXT_MENU_SPA]
