/*
 * @Author: czy0729
 * @Date: 2022-08-14 07:07:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 16:41:00
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
      paddingLeft: W_TAB_BAR_LEFT,
      backgroundColor: _.ios('transparent', _.select('transparent', _.colorPlain)),
      borderBottomWidth: _.ios(
        0,
        _.select(_.hairlineWidth, _.deep(0, _.hairlineWidth))
      ),
      borderBottomColor: _.ios(
        'transparent',
        _.select(_.colorBorder, _.deep('transparent', 'rgba(0, 0, 0, 0.16)'))
      ),
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
