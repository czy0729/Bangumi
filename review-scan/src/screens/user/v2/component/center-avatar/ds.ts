/*
 * @Author: czy0729
 * @Date: 2023-12-31 10:03:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-31 13:22:27
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'CenterAvatar')

export const AVATAR_SIZE = _.r(88)

export const HIT_SLOP = {
  top: 28,
  right: 16,
  bottom: 16,
  left: 28
} as const
