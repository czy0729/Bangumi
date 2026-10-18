/*
 * @Author: czy0729
 * @Date: 2022-08-27 21:13:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:16:32
 *
 * 计数块容器与卡片
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    minHeight: 56,
    paddingHorizontal: _.wind,
    paddingTop: _.xs,
    paddingLeft: _.wind - _.sm
  },
  count: {
    paddingVertical: _.sm,
    paddingHorizontal: _.md,
    marginTop: _.sm,
    marginLeft: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  }
}))
