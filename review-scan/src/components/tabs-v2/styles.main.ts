/*
 * @Author: czy0729
 * @Date: 2022-05-07 11:52:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-29 08:52:20
 */
import { _ } from '@stores'

export const W_INDICATOR = 16

export const memoStyles = _.memoStyles(() => ({
  tabBar: {
    backgroundColor: _.ios(
      'transparent',
      _.select('transparent', _.deepDark ? _._colorPlain : _._colorDarkModeLevel1)
    ),
    borderBottomWidth: _.select(
      _.ios(0, _.hairlineWidth),
      _.deepDark ? 0 : _.hairlineWidth
    ),
    borderBottomColor: _.colorBorder,
    elevation: 0
  },
  tab: {
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
    backgroundColor: _.colorMain,
    borderRadius: 4
  }
}))
