/*
 * @Author: czy0729
 * @Date: 2022-08-05 06:27:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-05 07:20:52
 */
import { _ } from '@stores'
import { H_RADIUS_LINE } from '../../ds'

export const memoStyles = _.memoStyles(() => ({
  tabBarLeft: {
    zIndex: 10,
    paddingLeft: _.r(_._wind) - 4,
    paddingRight: _.sm,
    marginTop: 13 - H_RADIUS_LINE,
    backgroundColor: _.select(
      'transparent',
      _.deepDark ? _._colorPlain : _._colorDarkModeLevel1
    ),
    borderTopLeftRadius: H_RADIUS_LINE,
    borderTopRightRadius: H_RADIUS_LINE,
    overflow: 'hidden'
  },
  btn: {
    width: _.r(56),
    height: _.ios(28, 22),
    marginTop: _.ios(0, 3),
    borderRadius: _.r(16)
  },
  text: {
    width: _.r(56)
  },
  textIOS: {
    lineHeight: 14
  }
}))
