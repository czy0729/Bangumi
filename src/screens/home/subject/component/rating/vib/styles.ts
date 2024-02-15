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
    top: 32,
    right: -4,
    paddingTop: 4,
    paddingHorizontal: 6,
    paddingBottom: 5,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
