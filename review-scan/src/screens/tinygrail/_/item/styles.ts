/*
 * @Author: czy0729
 * @Date: 2022-11-07 16:47:57
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-07 16:47:57
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  item: {
    paddingVertical: _.md,
    paddingLeft: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
