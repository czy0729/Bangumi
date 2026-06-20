/*
 * @Author: czy0729
 * @Date: 2026-06-21 02:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 02:20:00
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
