/*
 * @Author: czy0729
 * @Date: 2022-09-28 17:34:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 12:33:30
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
        scaleY: -1
      }
    ]
  },
  reverseIcon: {
    marginRight: 4,
    marginLeft: _.md
  }
}))
