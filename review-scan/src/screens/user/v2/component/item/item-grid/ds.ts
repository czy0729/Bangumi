/*
 * @Author: czy0729
 * @Date: 2023-12-31 11:22:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 16:25:02
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ItemGrid')

export const EVENT = {
  id: '我的.跳转',
  type: 'grid'
} as const
