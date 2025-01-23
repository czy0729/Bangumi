/*
 * @Author: czy0729
 * @Date: 2022-06-17 12:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-24 06:16:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wrap: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  body: {
    marginTop: 2,
    marginLeft: _._wind
  },
  edit: {
    marginTop: 12,
    marginRight: -9
  }
}))
