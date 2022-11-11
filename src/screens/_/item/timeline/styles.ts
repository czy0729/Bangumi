/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:17:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 20:02:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  content: {
    paddingTop: _.md,
    paddingRight: _.wind - _._wind,
    paddingBottom: _.md
  },
  noPR: {
    paddingVertical: _.md,
    paddingRight: _.wind - _._wind
  },
  hasPR: {
    paddingRight: _._wind
  },
  touch: {
    marginTop: -7,
    marginHorizontal: _.xs,
    borderRadius: 20,
    overflow: 'hidden'
  },
  extra: {
    width: 36,
    height: 36
  }
}))
