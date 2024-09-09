/*
 * @Author: czy0729
 * @Date: 2022-08-19 04:03:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 19:05:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  }
}))
