/*
 * @Author: czy0729
 * @Date: 2023-10-29 23:25:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:22:53
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'LikesGrid')

export const DATA = [
  [44, 0],
  [40, 79],
  [15, 54],
  [101, 140],
  [23, 62],
  [83, 122],
  [65, 104],
  [41, 80],
  [102, 141],
  [49, 88],
  [46, 85],
  [51, 90]
] as const

export const DATA_TIMELINE = [
  [44, 0],
  [65, 104],
  [15, 54],
  [101, 140],
  [83, 122],
  [51, 90],
  [49, 88],
  [41, 80]
] as const
