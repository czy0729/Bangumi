/*
 * @Author: czy0729
 * @Date: 2023-12-31 11:23:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 16:25:05
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemList')

export const EVENT = {
  id: '我的.跳转',
  type: 'list'
} as const
