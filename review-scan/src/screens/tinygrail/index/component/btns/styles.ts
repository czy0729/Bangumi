/*
 * @Author: czy0729
 * @Date: 2022-11-07 14:05:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 06:58:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    marginLeft: 12
  },
  btn: {
    width: 56,
    height: 36,
    backgroundColor: _.select(_.colorTinygrailBg, _.colorTinygrailIcon),
    border: 0,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  text: {
    color: _.select(_.colorTinygrailPlain, _.__colorPlain__),
    ..._.fontSize13
  }
}))
