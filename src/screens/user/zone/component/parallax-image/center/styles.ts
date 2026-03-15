/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-15 16:27:47
 */
import { _ } from '@stores'
import { IS_IOS_5_6_7_8 } from '@styles'
import { H_RADIUS_LINE } from '../../../ds'

export const memoStyles = _.memoStyles(() => ({
  parallaxWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: -2,
    left: 0
  },
  parallaxLine: {
    position: 'absolute',
    right: 0,
    bottom: -1,
    left: 0,
    height: H_RADIUS_LINE,
    backgroundColor: _.select(_.colorPlain, _.deepDark ? _._colorPlain : _._colorDarkModeLevel1),
    borderTopLeftRadius: H_RADIUS_LINE,
    borderTopRightRadius: H_RADIUS_LINE,
    overflow: 'hidden'
  },
  head: {
    marginTop: (_.parallaxImageHeight - 120) / 2
  },
  sensor: {
    zIndex: 1,
    marginTop: _.parallaxImageHeight - 102 + _.ios(IS_IOS_5_6_7_8 ? -6 : -6, -4),
    marginRight: 3,
    opacity: 0.8
  }
}))
