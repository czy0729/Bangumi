/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:41:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 17:41:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchIpt: {
    height: 34,
    paddingHorizontal: _._wind,
    ..._.fontSize(12),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 34
  }
}))
