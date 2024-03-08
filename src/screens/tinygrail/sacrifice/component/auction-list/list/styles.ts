/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:47:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 02:53:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.sm,
    borderBottomColor: _.colorTinygrailBorder,
    borderBottomWidth: _.hairlineWidth
  },
  time: {
    width: 96
  }
}))
