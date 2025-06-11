/*
 * @Author: czy0729
 * @Date: 2025-06-09 19:42:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-12 01:55:57
 */
import { _ } from '@stores'
import { ITEM_MARGIN } from '../../ds'

export const styles = _.create({
  container: {
    paddingTop: _.headerHeight + _.sm,
    paddingRight: ITEM_MARGIN,
    paddingBottom: 52,
    paddingLeft: ITEM_MARGIN - 2
  },
  list: {
    flexDirection: 'row',
    minHeight: _.window.height - _.headerHeight - 134,
    paddingBottom: 64
  },
  column: {
    flex: 1,
    marginHorizontal: ITEM_MARGIN / 2
  },
  item: {
    borderRadius: 6,
    overflow: 'hidden'
  }
})
