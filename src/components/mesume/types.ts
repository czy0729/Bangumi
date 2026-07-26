/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:03:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 05:30:00
 */
import type { ImageStyle } from '@types'

export type Props = {
  /** 图片样式 */
  style?: ImageStyle

  /** 图片尺寸，默认 96 */
  size?: number

  /** 看板娘编号，不传则随机 1-7 */
  index?: 1 | 2 | 3 | 4 | 5 | 6 | 7
}
