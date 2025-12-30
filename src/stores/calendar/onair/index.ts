/*
 * @Author: czy0729
 * @Date: 2023-04-06 05:46:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-30 19:16:54
 */
import { ONAIR_2025S2 } from './2025S2'
import { ONAIR_2025S3 } from './2025S3'
import { ONAIR_2025S4 } from './2025S4'
import { ONAIR_2026S1 } from './2026S1'

export const ON_AIR = {
  ...ONAIR_2025S2,
  ...ONAIR_2025S3,
  ...ONAIR_2025S4,
  ...ONAIR_2026S1
} as const
