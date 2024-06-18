/*
 * @Author: czy0729
 * @Date: 2023-04-06 05:46:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-28 13:57:28
 */
import { ONAIR_2024S1 } from './2024S1'
import { ONAIR_2024S2 } from './2024S2'
import { ONAIR_2024S3 } from './2024S3'

export const ON_AIR = {
  ...ONAIR_2024S1,
  ...ONAIR_2024S2,
  ...ONAIR_2024S3
} as const
