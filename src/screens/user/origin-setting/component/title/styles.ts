/*
 * @Author: czy0729
 * @Date: 2026-09-26 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-26 12:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  count: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: _.sm,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  test: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
