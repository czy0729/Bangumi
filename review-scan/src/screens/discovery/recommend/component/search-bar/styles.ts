/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:30:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 05:20:07
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchBar: {
    borderTopRightRadius: 34,
    borderBottomRightRadius: 34,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    overflow: 'hidden'
  },
  searchIpt: {
    height: 40,
    paddingVertical: 0,
    // paddingRight: 12,
    // paddingLeft: 12,
    ..._.fontSize12,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 0
  },
  split: {
    width: 1,
    height: 16,
    marginRight: 8,
    borderLeftWidth: 1,
    borderColor: _.colorBorder
  }
}))
