/*
 * @Author: czy0729
 * @Date: 2022-11-09 06:28:40
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-09 06:28:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingHorizontal: _.wind
  },
  content: {
    paddingVertical: _.sm
  },
  close: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.md
  }
}))
