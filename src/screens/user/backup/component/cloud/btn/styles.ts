/*
 * @Author: czy0729
 * @Date: 2026-11-01 04:03:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 导出入口按钮样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 8
  }
}))
