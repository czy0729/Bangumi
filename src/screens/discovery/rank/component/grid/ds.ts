/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:27:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 04:32:51
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Grid')

export const EVENT_GRID = {
  id: '排行榜.跳转',
  data: {
    type: 'grid'
  }
} as const
