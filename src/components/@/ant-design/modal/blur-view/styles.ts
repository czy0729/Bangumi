/*
 * @Author: czy0729
 * @Date: 2022-08-14 11:48:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-13 05:02:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  blurView: {
    paddingTop: 20,
    backgroundColor: _.ios(
      _.select('rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.08)'),
      _.select(_.colorBg, _._colorDarkModeLevel1)
    ),
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
}))
