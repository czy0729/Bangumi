/*
 * @Author: czy0729
 * @Date: 2025-01-04 16:14:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-05 08:23:07
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
