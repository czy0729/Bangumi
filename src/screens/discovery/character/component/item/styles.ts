/*
 * @Author: czy0729
 * @Date: 2022-09-28 01:13:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-06 14:31:57
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
    }
  }
})
