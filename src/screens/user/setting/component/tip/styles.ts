/*
 * @Author: czy0729
 * @Date: 2022-08-01 17:51:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 21:00:00
 */
import { _ } from '@stores'

/** Tip 位于分组卡片外部, 水平与卡片内 ITEM 行文字对齐 (卡片边距 wind + 行内边距 _wind) */
export const memoStyles = _.memoStyles(() => ({
  tip: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind + _._wind
  }
}))
