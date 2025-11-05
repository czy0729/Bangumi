/*
 * @Author: czy0729
 * @Date: 2024-01-11 05:14:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 05:25:06
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Grid')

export const EVENT = {
  id: '索引.跳转',
  data: {
    type: 'grid'
  }
} as const
