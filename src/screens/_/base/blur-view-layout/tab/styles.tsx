/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:29:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:44:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const backgroundColor = _.ios(
    'transparent',
    _.select(_.colorPlain, _.deepDark ? _._colorPlain : _._colorDarkModeLevel1)
  )

  return {
    ios: {
      position: 'absolute',
      zIndex: 1,
      right: 0,
      backgroundColor
    },
    android: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      right: 0,
      left: 0,
      backgroundColor: _.select('transparent', 'rgba(0, 0, 0, 0.5)'),
      overflow: 'hidden'
    },
    view: {
      backgroundColor
    }
  }
})
