/*
 * @Author: czy0729
 * @Date: 2024-01-06 20:31:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 23:03:32
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'TimelineList')

export const EVENT = {
  id: '空间.跳转',
  data: {
    from: '时间胶囊'
  }
} as const
