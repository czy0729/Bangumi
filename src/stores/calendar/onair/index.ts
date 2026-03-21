/*
 * @Author: czy0729
 * @Date: 2023-04-06 05:46:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 01:04:58
 */
import { ONAIR_2025S2 } from './2025S2'
import { ONAIR_2025S3 } from './2025S3'
import { ONAIR_2025S4 } from './2025S4'
import { ONAIR_2026S1 } from './2026S1'
import { ONAIR_2026S2 } from './2026S2'

/** 每日放送元数据 */
export const ON_AIR = {
  ...ONAIR_2025S2,
  ...ONAIR_2025S3,
  ...ONAIR_2025S4,
  ...ONAIR_2026S1,
  ...ONAIR_2026S2
} as const
