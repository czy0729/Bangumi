/*
 * @Author: czy0729
 * @Date: 2024-01-11 15:40:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-11 05:42:13
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_INFORMATION, TEXT_MENU_SPA, WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

const DATA = [TEXT_MENU_BROWSER]
if (!WEB) DATA.push(TEXT_MENU_SPA)
DATA.push(TEXT_MENU_INFORMATION)

export { DATA }

export const HM = ['discovery/catalog', 'Catalog'] as const
