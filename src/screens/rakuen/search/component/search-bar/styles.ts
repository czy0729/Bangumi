/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:41:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchIpt: {
    height: 40,
    paddingVertical: 0,
    paddingRight: 20,
    paddingLeft: 20,
    ..._.fontSize12,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    // 左侧与排序按钮拼接, 只保留右侧圆角
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40
  }
}))
