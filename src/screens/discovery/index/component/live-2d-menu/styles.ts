/*
 * @Author: czy0729
 * @Date: 2026-03-10 06:54:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 06:59:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  badge: {
    paddingTop: 2,
    paddingHorizontal: 6,
    paddingBottom: 3,
    marginLeft: 6,
    marginRight: -2,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel1),
    borderRadius: _.radiusXs
  },
  icon: {
    opacity: 0.44,
    width: 12,
    height: 7,
    marginVertical: 3,
    borderRadius: 16,
    overflow: 'hidden'
  }
}))
