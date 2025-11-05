/*
 * @Author: czy0729
 * @Date: 2022-08-27 21:21:46
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-27 21:21:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
  },
  touch: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
