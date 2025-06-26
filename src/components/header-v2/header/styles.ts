/*
 * @Author: czy0729
 * @Date: 2023-04-11 16:05:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 15:38:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  header: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    left: 0,
    height: _.headerHeight,
    paddingTop: _.statusBarHeight,
    paddingHorizontal: 6
  },
  title: {
    position: 'absolute',
    zIndex: 2,
    right: 48,
    bottom: 0,
    left: 48,
    height: _.ios(36, 48),
    pointerEvents: 'none'
  },
  titleText: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: -7
  },
  titleAppend: {
    marginTop: -7
  },
  transparent: {
    backgroundColor: 'transparent'
  }
}))
