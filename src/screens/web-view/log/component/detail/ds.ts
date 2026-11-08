/*
 * @Author: czy0729
 * @Date: 2025-03-14 07:49:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-08 11:40:00
 *
 * 组件标识与事件名反查表
 */
import { rc } from '@utils/dev'
import { EVENTS as events } from '@constants'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Detail')

/** 事件 key 反查显示名 */
export const FLIPPED = Object.fromEntries(
  Object.entries(events).map(([key, value]) => [value, key])
) as Record<string, string>
