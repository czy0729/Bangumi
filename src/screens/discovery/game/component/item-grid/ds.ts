/*
 * @Author: czy0729
 * @Date: 2024-03-18 21:14:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 网格布局条目组件常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemGrid')

export const EVENT = {
  id: '游戏.跳转'
} as const
