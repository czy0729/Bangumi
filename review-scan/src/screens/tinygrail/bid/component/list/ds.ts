/*
 * @Author: czy0729
 * @Date: 2025-01-16 16:28:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-16 16:28:58
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '我的委托.跳转'
} as const

export const GO = {
  bid: '买入',
  asks: '卖出',
  auction: '资产重组'
} as const
