/*
 * @Author: czy0729
 * @Date: 2025-10-29 22:55:32
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-10-29 22:55:32
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT_LIST = {
  id: '排行榜.跳转',
  data: {
    type: 'list'
  }
} as const

export const EVENT_GRID = {
  id: '排行榜.跳转',
  data: {
    type: 'grid'
  }
} as const
