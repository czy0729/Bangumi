/*
 * @Author: czy0729
 * @Date: 2024-09-27 15:46:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 12:07:01
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: _.window.width - 2 * _._wind,
    height: _.window.height - 240,
    paddingLeft: _._wind,
    marginTop: _.web(0, -40)
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
  },
  transparent: {
    opacity: 0.56
  }
}))
