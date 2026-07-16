/*
 * @Author: czy0729
 * @Date: 2025-06-09 19:42:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:19:00
 */
import { _ } from '@stores'
import { ITEM_MARGIN } from '../../ds'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    paddingRight: ITEM_MARGIN,
    paddingBottom: 52,
    paddingLeft: ITEM_MARGIN - 2
  },
  wrap: {
    minHeight: _.window.height - 134
  },
  list: {
    flexDirection: 'row',
    paddingBottom: 64
  },
  column: {
    flex: 1,
    marginHorizontal: ITEM_MARGIN / 2
  }
}))
