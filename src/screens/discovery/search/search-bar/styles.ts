/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:34:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-07-30 13:34:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchIpt: {
    height: _.r(34),
    paddingHorizontal: _._wind,
    ..._.fontSize(_.device(12, 14)),
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderRadius: 0
  },
  radius: {
    borderTopRightRadius: _.r(34),
    borderBottomRightRadius: _.r(34)
  }
}))
