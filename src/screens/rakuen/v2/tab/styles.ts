/*
 * @Author: czy0729
 * @Date: 2022-09-03 05:26:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 05:26:33
 */
import { _ } from '@stores'
import { H_TABBAR } from '../ds'

export const memoStyles = _.memoStyles(() => {
  const W_TAB_BAR_LEFT = 0
  const W_TAB = _.window.width / 5
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
    labelText: {
      width: '100%'
    },
    indicator: {
      width: W_INDICATOR,
      height: 4,
      marginLeft: (W_TAB - W_INDICATOR) / 2 + W_TAB_BAR_LEFT,
      backgroundColor: _.colorMain,
      borderRadius: 4
    },
    sceneContainerStyle: {
      marginTop: _.ios(-_.headerHeight - H_TABBAR, 0)
    },
    blurView: {
      position: 'absolute',
      zIndex: 1,
      top: _.device(0, -12),
      right: 0,
      height: _.headerHeight + H_TABBAR + _.device(0, 12)
    }
  }
})
