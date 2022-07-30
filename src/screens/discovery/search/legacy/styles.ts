/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:43:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 13:43:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    borderTopRightRadius: _.r(34),
    borderBottomRightRadius: _.r(34),
    overflow: 'hidden'
  },
  btn: {
    width: _.r(68),
    height: _.r(34),
    paddingRight: _.r(4),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderLeftWidth: 0,
    borderColor: _.colorBorder,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: _.r(34),
    borderBottomRightRadius: _.r(34)
  },
  text: {
    width: _.r(68)
  }
}))
