/*
 * @Author: czy0729
 * @Date: 2022-06-19 16:16:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:28:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tabBar: {
    position: 'absolute',
    zIndex: 2,
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
