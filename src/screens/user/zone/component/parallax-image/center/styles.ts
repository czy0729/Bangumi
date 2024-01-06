/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:45:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 09:46:11
 */
import { _ } from '@stores'
import { H_RADIUS_LINE } from '../../../store'

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
  }
}))
