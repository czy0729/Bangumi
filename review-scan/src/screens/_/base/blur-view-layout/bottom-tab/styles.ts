/*
 * @Author: czy0729
 * @Date: 2023-08-10 03:57:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-17 15:47:08
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bottomTabFill: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0,
    height: _.tabBarHeight,
    backgroundColor: _.select(_.colorPlain, _.deep(_._colorPlain, _._colorDarkModeLevel1)),
    overflow: 'hidden'
  },
  bottomTabBlur: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.select('transparent', 'rgba(0, 0, 0, 0.5)'),
    overflow: 'hidden'
  },
  container: {
    marginTop: -1
  },
  placeholder: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    bottom: 0,
    left: 0,
    height: 1,
    backgroundColor: '#000'
  }
}))
