/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 05:57:44
 */
import { _ } from '@stores'
import { window } from '@styles'

export const memoStyles = _.memoStyles(() => {
  const W_TAB_BAR_LEFT = _.r(68)
  const TAB_LENTH = _.device(5, _.isLandscape ? 6 : 7)
  const W_TAB = (window.width - W_TAB_BAR_LEFT) / TAB_LENTH
  const W_INDICATOR = _.r(16)
  return {
    tabBar: {
      position: 'absolute',
      zIndex: 2,
      top: _.headerHeight,
      right: 0,
      left: 0,
      paddingLeft: W_TAB_BAR_LEFT,
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      elevation: 0
    },
    tab: {
      width: W_TAB,
      height: _.r(48)
    },
    label: {
      padding: 0
    },
    indicator: {
      width: W_INDICATOR,
      height: 4,
      marginLeft: (W_TAB - W_INDICATOR) / 2 + W_TAB_BAR_LEFT,
      backgroundColor: _.colorMain,
      borderRadius: 4
    }
  }
})
