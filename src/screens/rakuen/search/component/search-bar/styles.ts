/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:41:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-12 05:17:16
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchIpt: {
    height: 40,
    paddingVertical: 0,
    paddingRight: 20,
    paddingLeft: 20,
    ..._.fontSize12,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 34
  }
}))
