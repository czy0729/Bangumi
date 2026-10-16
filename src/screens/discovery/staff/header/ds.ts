/*
 * @Author: czy0729
 * @Date: 2024-04-05 13:03:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 23:44:40
 *
 * 页面头部常量: 右上角菜单
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPA, WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const DATA = WEB ? [TEXT_MENU_BROWSER] : [TEXT_MENU_BROWSER, TEXT_MENU_SPA]
