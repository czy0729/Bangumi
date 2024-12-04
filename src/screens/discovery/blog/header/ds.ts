/*
 * @Author: czy0729
 * @Date: 2024-08-09 03:25:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 01:30:33
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPA, WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const HM = ['discovery/blog', 'DiscoveryBlog'] as const

const DATA = [TEXT_MENU_BROWSER]
if (!WEB) DATA.push(TEXT_MENU_SPA)
export { DATA }
