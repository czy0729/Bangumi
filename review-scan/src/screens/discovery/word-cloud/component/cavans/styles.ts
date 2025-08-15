/*
 * @Author: czy0729
 * @Date: 2024-09-27 15:46:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-02 08:54:03
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: _.window.width - 2 * _._wind,
    height: _.window.height - _.web(200, 280),
    paddingLeft: _._wind
  },
  empty: {
    height: 320,
    opacity: 0.8
  },
  fetching: {
    position: 'absolute',
    zIndex: 1,
    top: _.md,
    right: 0,
    left: 0,
    opacity: 0.64
  }
}))
