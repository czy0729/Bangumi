/*
 * @Author: czy0729
 * @Date: 2024-02-15 01:30:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-15 01:36:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  vib: {
    position: 'absolute',
    zIndex: 1,
    top: 34,
    right: -4
  },
  container: {
    paddingTop: 4,
    paddingHorizontal: 8,
    paddingBottom: 6,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
