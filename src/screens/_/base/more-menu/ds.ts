/*
 * @Author: czy0729
 * @Date: 2026-11-13 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'MoreMenu')

/** 导航引用未就绪时的重试间隔 */
export const NAVIGATION_RETRY_INTERVAL = 500

/** 导航引用未就绪时的最大重试次数 */
export const NAVIGATION_RETRY_MAX = 10
