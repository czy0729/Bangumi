/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:34:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-31 07:28:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  title: {
    paddingHorizontal: _.wind,
    marginTop: _.lg,
    marginBottom: _.md
  },
  reverse: {
    transform: [
      {
        rotateX: '180deg'
      }
    ]
  },
  reverseIcon: {
    marginRight: 4,
    marginLeft: _.md
  }
}))
