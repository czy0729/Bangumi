/*
 * @Author: czy0729
 * @Date: 2022-09-01 14:04:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-09 19:49:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingRight: _.wind - _._wind,
    paddingLeft: _.wind - _.device(_._wind, _._wind + 8)
  },
  section: {
    flex: 1,
    paddingTop: _.xs,
    paddingBottom: _.md,
    paddingLeft: _._wind,
    backgroundColor: _.colorPlain
  }
}))
