/*
 * @Author: czy0729
 * @Date: 2026-06-26 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-26 10:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  compact: {
    letterSpacing: -0.1
  },
  badge: {
    paddingTop: 2,
    paddingHorizontal: 6,
    paddingBottom: 3,
    marginLeft: 6,
    marginRight: -2,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel1),
    borderRadius: _.radiusXs
  }
}))
