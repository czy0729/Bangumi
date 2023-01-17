/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:44:58
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-26 00:44:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    marginLeft: _.sm,
    overflow: 'hidden'
  },
  imageSide: {
    overflow: 'hidden'
  },
  details: {
    paddingHorizontal: _.wind,
    marginTop: _.md
  }
}))
