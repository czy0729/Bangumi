/*
 * @Author: czy0729
 * @Date: 2022-11-07 14:05:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 17:49:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    marginLeft: 12
  },
  btn: {
    width: _.r(56),
    height: _.r(36),
    backgroundColor: _.tSelect(_.colorTinygrailIcon, _.colorTinygrailBg),
    border: 0,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  text: {
    color: _.tSelect(_.__colorPlain__, _.colorTinygrailPlain),
    ..._.fontSize13
  }
}))
