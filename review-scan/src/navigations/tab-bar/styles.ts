/*
 * @Author: czy0729
 * @Date: 2022-08-25 05:56:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-13 21:07:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tabBar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    height: _.tabBarHeight,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    elevation: 0,
    overflow: 'hidden'
  },
  item: {
    height: 50
  },
  icon: {
    width: 24,
    height: 24
  }
}))
