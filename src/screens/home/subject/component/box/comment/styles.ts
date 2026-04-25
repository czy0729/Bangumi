/*
 * @Author: czy0729
 * @Date: 2024-03-25 11:08:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 20:44:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  comments: {
    paddingTop: 11,
    paddingRight: _._wind,
    paddingLeft: 16,
    borderLeftWidth: 4,
    borderLeftColor: _.colorBorder,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  }
}))
