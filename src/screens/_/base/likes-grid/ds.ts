/*
 * @Author: czy0729
 * @Date: 2023-10-29 23:25:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-09 03:11:29
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'LikesGrid')

/** 帖子贴贴选项 */
export const DATA = [
  [67, 0],
  [63, 79],
  [38, 54],
  [124, 140],
  [46, 62],
  [106, 122],
  [88, 104],
  [64, 80],
  [125, 141],
  [72, 88],
  [69, 85],
  [74, 90]
] as const

/** 时间线贴贴选项 */
export const DATA_TIMELINE = [
  DATA[0],
  DATA[6],
  DATA[2],
  DATA[3],
  DATA[5],
  DATA[11],
  DATA[9],
  DATA[7]
] as const
