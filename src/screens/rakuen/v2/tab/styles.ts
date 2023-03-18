/*
 * @Author: czy0729
 * @Date: 2022-09-03 05:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 19:08:13
 */
import { _ } from '@stores'
import { H_TABBAR, TABS } from '../ds'

export const styles = _.create({
  sceneContainerStyle: {
    marginTop: _.ios(-_.headerHeight - H_TABBAR, 0)
  },
  blurView: {
    position: 'absolute',
    zIndex: 1,
    top: _.device(0, -12),
    right: 0,
    left: -_.window.width * TABS.length,
    height: _.headerHeight + H_TABBAR + _.device(0, 12)
  }
})
