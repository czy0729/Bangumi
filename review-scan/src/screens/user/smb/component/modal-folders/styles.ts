/*
 * @Author: czy0729
 * @Date: 2023-11-24 15:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-29 02:59:41
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  modal: {
    width: _.r(_.window.contentWidth) + 2,
    marginTop: -_.window.height * 0.22,
    maxWidth: _.device(408, 560),
    paddingTop: _.device(_.md + 2, 28),
    paddingHorizontal: _.device(0, _.sm),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusMd
  },
  body: {
    maxHeight: _.window.height * 0.64
  },
  folders: {
    marginTop: -12
  },
  subject: {
    marginTop: _.xs,
    marginRight: 2
  }
}))
