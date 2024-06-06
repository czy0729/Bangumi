/*
 * @Author: czy0729
 * @Date: 2024-02-28 11:13:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-05 14:40:39
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Tab')

export const STATUS_MAP = {
  wishes: 'wish',
  collections: 'collect',
  doings: 'doing',
  on_hold: 'onHold',
  dropped: 'dropped'
} as const
