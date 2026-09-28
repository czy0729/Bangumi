/*
 * @Author: czy0729
 * @Date: 2024-08-18 08:04:09
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-08-18 08:04:09
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Grid')

export const EVENT = {
  id: '用户标签.跳转',
  data: {
    type: 'grid'
  }
} as const
