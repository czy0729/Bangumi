/*
 * @Author: czy0729
 * @Date: 2023-11-26 17:34:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-26 17:50:34
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.contentWidth),
    marginTop: -_.window.height * 0.22,
    maxWidth: _.device(408, 560),
    paddingTop: _.device(_.md + 2, 28),
    paddingHorizontal: _.device(0, _.sm),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  body: {
    paddingHorizontal: 6
  },
  input: {
    marginTop: _.md,
    ..._.fontSize12
  },
  multilineInputStyle: {
    ..._.fontSize12
  }
}))
