/*
 * @Author: czy0729
 * @Date: 2025-06-09 20:25:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 02:21:20
 */
import { _ } from '@stores'
import { ITEM_MARGIN } from '../../../ds'

export const memoStyles = _.memoStyles(() => ({
  item: {
    marginBottom: ITEM_MARGIN,
    backgroundColor: _.colorBg,
    borderRadius: 6,
    overflow: 'hidden'
  }
}))
