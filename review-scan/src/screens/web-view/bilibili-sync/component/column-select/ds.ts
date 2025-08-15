/*
 * @Author: czy0729
 * @Date: 2024-09-14 16:13:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 16:16:07
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'ColumnSelect')

export const COLOR_SUCCESS = 'rgb(1, 173, 145)'

export const HIT_SLOP = {
  top: 4,
  right: 32,
  bottom: 4,
  left: 16
} as const
