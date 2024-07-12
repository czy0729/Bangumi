/*
 * @Author: czy0729
 * @Date: 2024-02-03 19:50:35
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-02-03 19:50:35
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ErrorNotice')

export const HIT_SLOP = {
  top: 8,
  right: 8,
  bottom: 8,
  left: 8
} as const
