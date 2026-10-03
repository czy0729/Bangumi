/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 *
 * 找音乐列表布局条目样式
 *  - 专辑封面为正方形 (IMG_SIZE), 右侧 content 高度与之对齐
 */
import { _ } from '@stores'
import { IMG_SIZE } from './ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    height: IMG_SIZE
  },
  loading: {
    height: IMG_SIZE
  },
  tip: {
    minHeight: 52
  }
}))
