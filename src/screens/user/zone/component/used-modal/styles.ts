/*
 * @Author: czy0729
 * @Date: 2022-10-22 09:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 22:03:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.width - 2 * _.wind),
    maxWidth: _.r(320),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  content: {
    paddingHorizontal: _.sm
  }
}))
