/*
 * @Author: czy0729
 * @Date: 2022-08-05 06:27:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-23 04:29:37
 */
import { _ } from '@stores'

import { H_RADIUS_LINE } from '../../ds'

export const memoStyles = _.memoStyles(() => ({
  tabBarLeft: {
    zIndex: 10,
    paddingLeft: _.r(_._wind) - 4,
    paddingRight: _.sm,
    marginTop: _.r(13) - H_RADIUS_LINE,
    backgroundColor: 'transparent',
    borderTopLeftRadius: H_RADIUS_LINE,
    borderTopRightRadius: H_RADIUS_LINE,
    overflow: 'hidden'
  },
  btn: {
    width: _.r(56),
    height: _.ios(28, 22),
    marginTop: _.ios(_.device(0, 3), 3),
    borderRadius: _.r(16)
  },
  text: {
    width: 56,
    lineHeight: _.ios(_.r(14), 16)
  }
}))
