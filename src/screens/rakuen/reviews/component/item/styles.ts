/*
 * @Author: czy0729
 * @Date: 2022-09-26 21:21:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-19 22:22:49
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingLeft: _.wind - _._wind + _.md
  },
  inView: {
    minWidth: 40,
    minHeight: 40,
    marginRight: _.sm
  },
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind - _._wind + _.md
  },
  content: {
    padding: 12,
    marginTop: _.sm,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm
  }
}))
