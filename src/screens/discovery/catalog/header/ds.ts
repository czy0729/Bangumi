/*
 * @Author: czy0729
 * @Date: 2024-01-11 15:40:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 头部组件标识与右上角菜单项
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_INFORMATION, TEXT_MENU_SPA, WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['discovery/catalog', 'Catalog'] as const

export const DATA = [TEXT_MENU_BROWSER, ...(WEB ? [] : [TEXT_MENU_SPA]), TEXT_MENU_INFORMATION]
