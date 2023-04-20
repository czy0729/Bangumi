/*
 * @Author: czy0729
 * @Date: 2022-09-03 11:12:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:31:38
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: '100%',
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  readed: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  avatar: {
    marginTop: _.ios(0, 1)
  },
  inView: {
    minWidth: 40,
    minHeight: 40
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  placeholder: {
    height: 74
  }
}))
