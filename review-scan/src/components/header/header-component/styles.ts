/*
 * @Author: czy0729
 * @Date: 2023-04-11 16:05:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 03:15:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  header: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    height: _.headerHeight,
    paddingTop: _.statusBarHeight,
    paddingRight: 6,
    paddingLeft: 5
  },
  back: {
    zIndex: 1
  }
}))
