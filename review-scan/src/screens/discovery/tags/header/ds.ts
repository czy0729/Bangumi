/*
 * @Author: czy0729
 * @Date: 2024-04-05 04:20:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-16 20:24:22
 */
import { rc } from '@utils/dev'
import { WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const TEXT_BROWSER = '浏览器查看'

export const TEXT_SPA = '网页版查看'

const DATA = [TEXT_BROWSER]
if (!WEB) DATA.push(TEXT_SPA)

export { DATA }
