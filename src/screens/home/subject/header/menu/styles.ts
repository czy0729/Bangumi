/*
 * @Author: czy0729
 * @Date: 2024-11-09 02:53:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 03:26:20
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  wordCloud: {
    padding: 8,
    marginRight: 8,
    opacity: _.select(1, 0.9)
  },
  location: {
    zIndex: _.web(2, undefined),
    marginRight: _.xs
  },
  menu: {
    zIndex: _.web(2, undefined)
  }
}))
