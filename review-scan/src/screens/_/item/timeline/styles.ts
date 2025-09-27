/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:17:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 19:13:03
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  inView: {
    minWidth: 40,
    minHeight: 40
  },
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
  menu: {
    minWidth: _._wind
  },
  touch: {
    marginTop: -7,
    marginRight: _.xs,
    borderRadius: 20,
    overflow: 'hidden'
  },
  cover: {
    paddingRight: 8,
    marginLeft: _.md
  },
  extra: {
    width: 36,
    height: 36
  }
}))
