/*
 * @Author: czy0729
 * @Date: 2024-01-12 05:51:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-10 15:28:53
 */
import { rc } from '@utils/dev'
import { STORYBOOK } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const TEXT_COPY = '复制并创建目录'

export const TEXT_BROWSER = '浏览器查看'

export const TEXT_SPA = '网页版查看'

const DATA = [TEXT_COPY, TEXT_BROWSER]
if (!STORYBOOK) DATA.push(TEXT_SPA)

export { DATA }
