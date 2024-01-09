/*
 * @Author: czy0729
 * @Date: 2022-09-01 14:04:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 17:51:19
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind - _.device(_._wind, _._wind + 8)
  },
  section: {
    flex: 1,
    paddingVertical: _.md,
    paddingLeft: _._wind,
    backgroundColor: _.colorPlain
  }
}))
