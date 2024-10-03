/*
 * @Author: czy0729
 * @Date: 2023-04-06 05:46:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-04 04:23:15
 */
// import { ONAIR_2024S1 } from './2024S1'
// import { ONAIR_2024S2 } from './2024S2'
import { ONAIR_2024S3 } from './2024S3'
import { ONAIR_2024S4 } from './2024S4'

export const ON_AIR = {
  // ...ONAIR_2024S1,
  // ...ONAIR_2024S2,
  ...ONAIR_2024S3,
  ...ONAIR_2024S4
} as const
