/*
 * @Author: czy0729
 * @Date: 2024-04-07 09:17:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:00:00
 *
 * 列表组件标识与埋点事件名
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: 'Anitama.跳转'
} as const
