/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:34:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 06:03:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchIpt: {
    height: 40,
    paddingVertical: 0,
    paddingRight: 4,
    paddingLeft: 12,
    ..._.fontSize12,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderRadius: 0
  },
  radius: {
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40
  }
}))
