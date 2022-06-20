/*
 * @Author: czy0729
 * @Date: 2022-06-19 16:28:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-19 16:31:24
 */
import { _ } from '@stores'
import { ViewStyle } from '@types'
import { H_TABBAR } from '../store'

export const memoStyles = _.memoStyles(() => {
  const tabs: ViewStyle = {
    position: 'absolute',
    zIndex: 1,
    top: -_.statusBarHeight || 0,
    right: 0,
    height: _.headerHeight + H_TABBAR + (_.statusBarHeight || 0)
  }
  return {
    tabs4: {
      ...tabs,
      left: -_.window.width * 4
    },
    tabs3: {
      ...tabs,
      left: -_.window.width * 3
    }
  }
})
