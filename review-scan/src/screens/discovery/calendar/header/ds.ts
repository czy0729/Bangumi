/*
 * @Author: czy0729
 * @Date: 2024-01-09 15:10:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-28 16:49:51
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPA, WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const TEXT_INFOR = '补充说明'

const DATA = [TEXT_MENU_BROWSER]
if (!WEB) DATA.push(TEXT_MENU_SPA)

DATA.push(TEXT_INFOR)

export { DATA }

export const HM = ['calendar', 'Calendar'] as const
