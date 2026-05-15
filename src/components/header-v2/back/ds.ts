/*
 * @Author: czy0729
 * @Date: 2024-01-14 15:32:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 05:09:39
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Back')

export const HIT_SLOP = {
  top: 24,
  right: 16,
  left: 16,
  bottom: 16
} as const
