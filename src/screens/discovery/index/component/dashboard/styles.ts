/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:19:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 06:58:04
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    paddingHorizontal: _.windSm + 2,
    marginTop: _.md + 8,
    marginBottom: _.xs
  },
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
