/*
 * @Author: czy0729
 * @Date: 2025-02-19 06:20:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-23 04:37:40
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
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel2),
    borderBottomWidth: 0
  },
  tags: {
    paddingRight: 100
  },
  tag: {
    marginRight: _.xs,
    marginBottom: _.xs
  },
  menu: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: _.md,
    height: 42 + 2 * _.md
  },
  open: {
    marginTop: 2,
    marginRight: -3,
    marginBottom: -10
  },
  loading: {
    width: 42,
    height: 42
  }
}))
