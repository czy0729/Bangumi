/*
 * @Author: czy0729
 * @Date: 2024-01-12 05:51:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 15:28:53
 */
import { rc } from '@utils/dev'
import { TEXT_MENU_BROWSER, TEXT_MENU_SPA, WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const TEXT_COPY = '复制并创建目录'

const DATA = [TEXT_COPY, TEXT_MENU_BROWSER]
if (!WEB) DATA.push(TEXT_MENU_SPA)

export { DATA }
