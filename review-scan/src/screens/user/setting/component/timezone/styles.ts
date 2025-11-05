/*
 * @Author: czy0729
 * @Date: 2023-03-14 21:02:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-14 21:14:56
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    padding: _.md,
    marginTop: _.md,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  itemActive: {
    borderColor: _.colorSuccess
  }
}))
