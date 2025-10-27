/*
 * @Author: czy0729
 * @Date: 2024-01-11 05:18:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:25:52
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPA, WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

const DATA = [TEXT_MENU_BROWSER]
if (!WEB) DATA.push(TEXT_MENU_SPA)

export { DATA }
