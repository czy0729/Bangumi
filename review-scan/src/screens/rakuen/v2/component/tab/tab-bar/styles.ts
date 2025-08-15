/*
 * @Author: czy0729
 * @Date: 2023-03-15 17:59:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 06:34:41
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const W_TAB_BAR_LEFT = 0
  const W_TAB = _.window.width / 5
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
    labelText: {
      width: '100%'
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
