/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:56:37
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  tabBarLeft: {
    position: 'absolute',
    zIndex: 3,
    top: _.headerHeight - _.sm + 2,
    left: 0
  }
}))
