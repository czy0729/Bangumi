/*
 * @Author: czy0729
 * @Date: 2024-02-12 18:11:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 18:12:28
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '我的持仓.跳转'
} as const
