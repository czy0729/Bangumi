/*
 * @Author: czy0729
 * @Date: 2023-06-28 09:21:21
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-06-28 09:21:21
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  parallaxImage: {
    marginTop: -8,
    height: _.parallaxImageHeight + 8
  }
}))
