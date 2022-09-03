/*
 * @Author: czy0729
 * @Date: 2022-09-03 11:12:05
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-03 11:12:05
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind
  },
  readed: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  avatar: {
    marginTop: _.ios(0, 1)
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  placeholder: {
    height: 74
  }
}))
