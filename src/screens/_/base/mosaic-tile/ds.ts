/*
 * @Author: czy0729
 * @Date: 2024-02-29 18:42:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-02 15:25:55
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'MosaicTile')

export const MEASURE_DAYS = {
  '01-25': 0,
  '02-22': 0,
  '03-25': 0,
  '04-24': 0,
  '05-25': 0,
  '06-24': 0,
  '07-25': 0,
  '08-25': 0,
  '09-24': 0,
  '10-25': 0,
  '11-24': 0,
  '12-25': 0
} as const
