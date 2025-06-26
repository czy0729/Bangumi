/*
 * @Author: czy0729
 * @Date: 2023-04-06 05:46:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-04 04:23:15
 */
// import { ONAIR_2024S4 } from './2024S4'
// import { ONAIR_2025S1 } from './2025S1'
import { ONAIR_2025S2 } from './2025S2'
import { ONAIR_2025S3 } from './2025S3'

export const ON_AIR = {
  // ...ONAIR_2024S4,
  // ...ONAIR_2025S1,
  ...ONAIR_2025S2,
  ...ONAIR_2025S3
} as const
