/*
 * @Author: czy0729
 * @Date: 2023-04-01 06:09:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-23 20:49:52
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Likes')

export const LIMIT = _.device(3, 5)

export const HIT_SLOP = {
  top: 12,
  right: 12,
  bottom: 12,
  left: 12
} as const
