/*
 * @Author: czy0729
 * @Date: 2022-06-02 15:33:02
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-02 15:33:02
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  contentContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: _.wind
  },
  actor: {
    marginRight: 3
  }
}))
