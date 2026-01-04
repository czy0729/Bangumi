/*
 * @Author: czy0729
 * @Date: 2022-09-28 01:44:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-28 01:45:21
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  scroll: {
    flex: 1,
    paddingTop: _.md,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom,
    backgroundColor: _.colorBg
  },
  baseFontStyle: {
    fontSize: 13 + _.fontSizeAdjust,
    lineHeight: 22,
    color: _.colorTitle
  }
}))
