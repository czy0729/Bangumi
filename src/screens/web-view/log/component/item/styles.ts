/*
 * @Author: czy0729
 * @Date: 2025-02-19 06:20:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-21 13:58:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorBorder
  },
  content: {
    marginLeft: 12
  },
  active: {
    backgroundColor: _.colorBg
  },
  menu: {
    position: 'absolute',
    zIndex: 1,
    top: _.md,
    right: _.md
  },
  open: {
    marginTop: 2,
    marginRight: -_.sm
  }
}))
