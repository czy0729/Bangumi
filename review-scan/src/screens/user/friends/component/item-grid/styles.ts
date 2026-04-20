/*
 * @Author: czy0729
 * @Date: 2024-04-12 02:16:52
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-12 02:16:52
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = _.portrait(5, 8)
  const gridStyles = _.grid(num)
  return {
    item: {
      width: gridStyles.width,
      marginTop: _.md,
      marginLeft: gridStyles.marginLeft
    },
    left: {
      marginLeft: 0
    },
    inView: {
      minWidth: gridStyles.width,
      minHeight: gridStyles.width
    }
  }
})
