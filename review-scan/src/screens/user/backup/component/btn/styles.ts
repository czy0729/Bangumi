/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:50:21
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 17:50:21
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  touch: {
    width: 56,
    borderRadius: _.r(28),
    overflow: 'hidden'
  },
  btn: {
    height: _.r(28),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.r(28)
  },
  btnSuccess: {
    backgroundColor: 'rgb(1, 173, 145)'
  }
}))
