/*
 * @Author: czy0729
 * @Date: 2023-10-29 23:25:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-03 05:44:33
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'LikesGrid')

/** .post_actions .grid li a */
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

/** 最新版已经与帖子中的统一 */
export const DATA_TIMELINE = DATA
