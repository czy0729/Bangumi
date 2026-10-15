/*
 * @Author: czy0729
 * @Date: 2025-06-09 20:25:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
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
