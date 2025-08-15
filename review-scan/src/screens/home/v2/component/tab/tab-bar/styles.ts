/*
 * @Author: czy0729
 * @Date: 2022-06-19 16:16:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-25 19:03:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tabBar: {
    position: 'absolute',
    zIndex: 2,
    top: _.headerHeight,
    right: 0,
    left: 0,
    backgroundColor: 'transparent',
    elevation: 0
  },
  tab: {
    height: 48
  },
  label: {
    padding: 0
  },
  indicator: {
    width: 16,
    height: 4,
    backgroundColor: _.colorMain,
    borderRadius: 4
  }
}))
