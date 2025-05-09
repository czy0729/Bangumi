/*
 * @Author: czy0729
 * @Date: 2025-05-09 23:05:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-05-09 23:05:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  sub: {
    paddingTop: 8,
    paddingLeft: 20,
    marginLeft: 24,
    marginBottom: 12,
    borderLeftWidth: 2,
    borderLeftColor: _.colorBorder
  }
}))
