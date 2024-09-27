/*
 * @Author: czy0729
 * @Date: 2024-09-27 15:46:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-27 16:56:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: _.window.contentWidth,
    height: _.window.height - 280
  },
  empty: {
    marginTop: _.lg,
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
