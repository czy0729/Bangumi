/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:32:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 04:54:37
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingVertical: _.sm + 4,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorTinygrailBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
