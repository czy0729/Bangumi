/*
 * @Author: czy0729
 * @Date: 2022-09-01 10:45:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-06 17:02:54
 */
import { _ } from '@stores'
import { TABS } from '../../ds'

export const memoStyles = _.memoStyles(() => {
  const W_TAB = _.window.width / TABS.length
  const W_INDICATOR = 16
  return {
    tabBar: {
      backgroundColor: _.ios(
        'transparent',
        _.select('transparent', _.deepDark ? _._colorPlain : _._colorDarkModeLevel1)
      ),
      borderBottomWidth: _.select(_.ios(0, _.hairlineWidth), _.deepDark ? 0 : _.hairlineWidth),
      borderBottomColor: _.colorBorder,
      elevation: 0
    },
    tab: {
      width: W_TAB,
      height: 48
    },
    label: {
      padding: 0
    },
    indicator: {
      width: W_INDICATOR,
      height: 4,
      marginLeft: (W_TAB - W_INDICATOR) / 2,
      backgroundColor: _.colorMain,
      borderRadius: 4
    }
  }
})
