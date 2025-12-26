/*
 * @Author: czy0729
 * @Date: 2025-05-13 15:30:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:40:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  drawer: {
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingBottom: _.lg
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
