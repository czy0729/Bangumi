/*
 * @Author: czy0729
 * @Date: 2024-01-09 15:10:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-29 12:22:32
 */
import { rc } from '@utils/dev'
import { STORYBOOK } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const TEXT_BROWSER = '浏览器查看'

export const TEXT_SPA = '网页版查看'

export const TEXT_INFOR = '补充说明'

const DATA = [TEXT_BROWSER]
if (!STORYBOOK) DATA.push(TEXT_SPA)

DATA.push(TEXT_INFOR)

export { DATA }
