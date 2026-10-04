/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 *
 * 找漫画列表布局条目样式
 *  - 漫画封面为竖版 (IMG_WIDTH_LG × IMG_HEIGHT_LG), 右侧 content 高度与之对齐
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  content: {
    height: IMG_HEIGHT_LG
  },
  loading: {
    height: IMG_HEIGHT_LG
  },
  tip: {
    minHeight: 52
  }
}))
