/*
 * @Author: czy0729
 * @Date: 2024-10-10 12:52:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-11 06:27:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = Math.floor(_.window.contentWidth / 5.8)
  return {
    list: {
      minHeight: _.window.height,
      paddingTop: _.md,
      paddingHorizontal: _.wind,
      paddingBottom: _.lg
    },
    item: {
      width,
      paddingBottom: 14,
      overflow: 'hidden'
    }
  }
})
