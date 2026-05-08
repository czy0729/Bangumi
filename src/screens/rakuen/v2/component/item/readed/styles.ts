/*
 * @Author: czy0729
 * @Date: 2024-01-05 16:02:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-09 00:13:09
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    width: '100%',
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind,
    backgroundColor: _.ios(_.colorPlain, 'transparent')
  },
  readed: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  }
}))
