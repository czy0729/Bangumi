/*
 * @Author: czy0729
 * @Date: 2025-05-13 15:30:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 14:46:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.statusBarHeight + _.sm,
    paddingHorizontal: 20,
    paddingBottom: _.lg,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
  },
  item: {
    paddingVertical: _.sm,
    marginTop: _.xs
  },
  title: {
    paddingVertical: _.sm,
    paddingLeft: _.md
  },
  sub: {
    paddingVertical: _.sm,
    paddingLeft: _.md * 2
  }
}))
