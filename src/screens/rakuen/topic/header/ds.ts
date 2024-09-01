/*
 * @Author: czy0729
 * @Date: 2024-01-03 20:16:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 00:37:47
 */
import { rc } from '@utils/dev'
import { WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Header')

export const TEXT_SPA = '网页版查看'

export const TEXT_COPY = '复制链接'

export const TEXT_SHARE = '复制分享'

export const TEXT_REPORT = '举报'

const DATA = [TEXT_COPY, TEXT_SHARE, TEXT_REPORT]
if (!WEB) DATA.unshift(TEXT_SPA)

export { DATA }
