/*
 * @Author: czy0729
 * @Date: 2022-08-27 21:13:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 07:06:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingLeft: _.wind - _.sm,
    minHeight: 56
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
