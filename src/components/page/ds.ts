/*
 * @Author: czy0729
 * @Date: 2024-01-15 02:02:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 06:26:35
 */
import { rc } from '@utils/dev'
import { DEV } from '@constants'
import { INVIEW_SHOW } from '@src/config'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Page')

/** DEV 环境下显示调试信息的标志 */
export const DEV_DEBUG = DEV && INVIEW_SHOW
