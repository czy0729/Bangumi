/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:28:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 14:29:33
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingLeft: _.wind
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  content: {
    paddingVertical: _.md,
    paddingRight: _._wind
  },
  katakanas: {
    marginTop: -4
  }
}))
