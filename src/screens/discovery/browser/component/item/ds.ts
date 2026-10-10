/*
 * @Author: czy0729
 * @Date: 2024-01-11 05:14:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:20:00
 *
 * 条目组件标识与跳转埋点事件名
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT_GRID = {
  id: '索引.跳转',
  data: {
    type: 'grid'
  }
} as const

export const EVENT_LIST = {
  id: '索引.跳转',
  data: {
    type: 'list'
  }
} as const
