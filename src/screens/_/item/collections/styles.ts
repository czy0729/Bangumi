/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 11:57:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  body: {
    marginTop: 2,
    marginLeft: _._wind
  },
  edit: {
    marginTop: 12,
    marginRight: -7
  },
  comments: {
    paddingHorizontal: _.wind,
    marginTop: -14,
    marginBottom: _.sm
  },
  commentsFull: {
    paddingTop: 11,
    paddingRight: _._wind,
    paddingLeft: 16,
    borderLeftWidth: 4,
    borderLeftColor: _.colorBorder,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  }
}))
