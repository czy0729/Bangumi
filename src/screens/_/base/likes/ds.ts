/*
 * @Author: czy0729
 * @Date: 2023-04-01 06:09:02
 * @Last Modified by: imagebuilder1837
 * @Last Modified time: 2026-05-22 20:21:58
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Likes')

export const LIMIT = 12

export const HIT_SLOP = {
  top: 12,
  right: 12,
  bottom: 12,
  left: 12
} as const
