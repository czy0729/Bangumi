/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:40:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:42:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  lg: {
    width: '100%'
  },
  md: {
    width: '50%'
  },
  sm: {
    width: '33.33333%'
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: _.colorTinygrailBorder
  },
  side: {
    borderLeftWidth: 1,
    borderLeftColor: _.colorTinygrailBorder
  }
}))
