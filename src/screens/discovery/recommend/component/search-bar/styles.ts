/*
 * @Author: czy0729
 * @Date: 2023-05-24 12:30:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:18:28
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
    ..._.fontSize12,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 0
  }
}))
