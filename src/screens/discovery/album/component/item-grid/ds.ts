/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 网格布局条目组件常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemGrid')

/** 跳转埋点 */
export const EVENT = {
  id: 'Album.跳转'
} as const
