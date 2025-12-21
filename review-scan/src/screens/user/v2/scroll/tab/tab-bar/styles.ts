/*
 * @Author: czy0729
 * @Date: 2023-03-19 16:09:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-19 16:18:00
 */
import { _ } from '@stores'
import { H_RADIUS_LINE } from '../../../ds'

export const memoStyles = _.memoStyles(() => {
  const W_TAB_BAR_LEFT = _.r(72)
  const W_TAB = (_.window.width - W_TAB_BAR_LEFT) / 5
  const W_INDICATOR = _.r(16)
  return {
    tabBarWrap: {
      position: 'absolute',
      zIndex: 2,
      top: -H_RADIUS_LINE + 2,
      right: 0,
      left: 0
    },
    tabBar: {
      paddingLeft: W_TAB_BAR_LEFT,
      backgroundColor: _.select(_.colorPlain, _.deepDark ? _._colorPlain : _._colorDarkModeLevel1),
      borderBottomWidth: _.flat ? 0 : _.select(_.hairlineWidth, 0),
      borderBottomColor: _.colorBorder,
      shadowOpacity: 0,
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
