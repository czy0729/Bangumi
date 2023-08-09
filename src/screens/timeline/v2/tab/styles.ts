/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 06:29:59
 */
import { _ } from '@stores'
import { H_TABBAR } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  sceneContainerStyle: {
    marginTop: _.ios(-_.headerHeight - H_TABBAR, 0)
  },
  tabBarLeft: {
    position: 'absolute',
    zIndex: 3,
    top: _.headerHeight - _.sm + 2,
    left: 0
  }
}))
