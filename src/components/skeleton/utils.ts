/*
 * @Author: czy0729
 * @Date: 2024-03-06 12:59:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-06 13:19:17
 */
import { _ } from '@stores'
import { SHIMMER_COLORS, SHIMMER_COLORS_DARK, SHIMMER_COLORS_TINYGRAIL_DARK } from './ds'

/** 获取骨架屏背景色 */
export function getSkeletonColor(type?: 'tinygrail' | 'app'): string {
  return _.select(
    SHIMMER_COLORS,
    type === 'tinygrail' ? SHIMMER_COLORS_TINYGRAIL_DARK : SHIMMER_COLORS_DARK
  )[0]
}
