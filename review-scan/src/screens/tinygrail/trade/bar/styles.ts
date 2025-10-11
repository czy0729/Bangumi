/*
 * @Author: czy0729
 * @Date: 2022-11-11 04:07:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 04:09:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  bar: {
    paddingVertical: _.sm,
    paddingLeft: 2,
    backgroundColor: _.colorTinygrailContainer,
    borderBottomWidth: 1,
    borderBottomColor: _.colorTinygrailBorder
  }
}))
