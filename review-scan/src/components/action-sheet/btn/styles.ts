/*
 * @Author: czy0729
 * @Date: 2023-12-12 22:11:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 18:08:47
 */
import { _ } from '@stores'
import { BTN_HEIGHT } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  close: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
  },
  btnContainer: {
    height: BTN_HEIGHT
  },
  btn: {
    paddingTop: _.md,
    paddingBottom: _.ios(_.lg, _.md)
  }
}))
