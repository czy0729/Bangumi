/*
 * @Author: czy0729
 * @Date: 2023-04-11 16:05:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-23 12:44:50
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  header: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: _.headerHeight,
    paddingTop: _.statusBarHeight,
    paddingHorizontal: 6
  },
  bg: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  title: {
    position: 'absolute',
    zIndex: 2,
    right: 40,
    bottom: 0,
    left: 40,
    height: 36,
    pointerEvents: 'none'
  },
  titleText: {
    fontSize: 16,
    lineHeight: 20,
    marginTop: -7
  }
}))
