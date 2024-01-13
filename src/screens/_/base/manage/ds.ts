/*
 * @Author: czy0729
 * @Date: 2023-11-28 22:43:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:30:53
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Manage')

export const HIT_SLOP = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20
} as const
