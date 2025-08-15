/*
 * @Author: czy0729
 * @Date: 2024-04-05 13:03:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 23:44:40
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPA, WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

const DATA = [TEXT_MENU_BROWSER]
if (!WEB) DATA.push(TEXT_MENU_SPA)
export { DATA }

export const HM = ['user/lilyurey/index', 'Staff'] as const
