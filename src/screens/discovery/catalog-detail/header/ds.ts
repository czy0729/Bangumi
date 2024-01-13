/*
 * @Author: czy0729
 * @Date: 2024-01-12 05:51:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-12 06:00:07
 */
import { rc } from '@utils/dev'
import { STORYBOOK } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const TEXT_BROWSER = '浏览器查看'

export const TEXT_SPA = '网页版查看'

const DATA = [TEXT_BROWSER]
if (!STORYBOOK) DATA.push(TEXT_SPA)

export { DATA }
