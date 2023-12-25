/*
 * @Author: czy0729
 * @Date: 2022-10-30 06:57:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-25 14:49:32
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.contentWidth),
    marginTop: _.web(-_.window.height * 0.22, 0),
    maxWidth: _.device(408, 560),
    paddingTop: _.device(_.md + 2, 28),
    paddingHorizontal: _.device(0, _.sm),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  body: {
    paddingHorizontal: 6,
    paddingTop: _.md
  }
}))
