/*
 * @Author: czy0729
 * @Date: 2022-10-22 09:21:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-26 04:35:13
 */
import { _ } from '@stores'
import { H_RADIUS_LINE } from '../../store'

const commonStyle = {
  tabBarWrap: {
    position: 'absolute',
    zIndex: 2,
    top: -H_RADIUS_LINE + 2,
    right: 0,
    left: 0
  },
  label: {
    padding: 0
  },
  labelText: {
    width: '100%'
  },
  tabBarLeft: {
    position: 'absolute',
    zIndex: 3,
    left: 0,
    marginTop: 2
  }
} as const

export const memoStyles = _.memoStyles(() => ({
  ...commonStyle,
  tabBar: {
    backgroundColor: _.select(_.colorPlain, _.deepDark ? _._colorPlain : _._colorDarkModeLevel1),
    borderBottomWidth: _.select(_.hairlineWidth, 0),
    borderBottomColor: _.colorBorder,
    shadowOpacity: 0,
    elevation: 0
  },
  tab: {
    height: _.r(48)
  },
  indicator: {
    width: _.r(16),
    height: 4,
    backgroundColor: _.colorMain,
    borderRadius: 4
  }
}))
