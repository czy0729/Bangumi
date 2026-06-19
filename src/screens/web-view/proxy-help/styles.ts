/*
 * @Author: czy0729
 * @Date: 2026-06-19 06:32:48
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-06-19 06:32:48
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  content: {
    paddingVertical: _.sm,
    paddingHorizontal: 12,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm
  }
}))
