/*
 * @Author: czy0729
 * @Date: 2023-08-10 03:57:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 06:24:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bottomTab: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    bottom: 0,
    left: 0,
    height: _.tabBarHeight,
    backgroundColor: _.select('transparent', 'rgba(0, 0, 0, 0.5)'),
    overflow: 'hidden'
  },
  view: {
    backgroundColor: _.select(
      _.colorPlain,
      _.deep(_._colorPlain, _._colorDarkModeLevel1)
    )
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
