/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:07:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-28 04:33:30
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'List')

export const EVENT = {
  id: '排行榜.跳转',
  data: {
    type: 'list'
  }
} as const
