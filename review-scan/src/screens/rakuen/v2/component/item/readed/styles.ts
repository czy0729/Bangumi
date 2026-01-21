/*
 * @Author: czy0729
 * @Date: 2024-01-05 16:02:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 16:08:02
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
  }
}))
