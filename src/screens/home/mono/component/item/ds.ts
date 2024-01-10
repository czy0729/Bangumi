/*
 * @Author: czy0729
 * @Date: 2022-07-19 17:09:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:34:19
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Item')

export const EVENT = {
  id: '人物.跳转',
  data: {
    from: '吐槽'
  }
} as const

export const ITEM_HEIGHT = 94
