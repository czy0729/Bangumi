/*
 * @Author: czy0729
 * @Date: 2025-01-25 11:04:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-26 14:50:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  userAge: {
    minWidth: 40,
    marginRight: 8,
    marginLeft: 5
  },
  text: {
    paddingTop: 1,
    paddingHorizontal: 5,
    color: _.colorSub,
    letterSpacing: 1,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    borderRadius: 4,
    overflow: 'hidden'
  }
}))
