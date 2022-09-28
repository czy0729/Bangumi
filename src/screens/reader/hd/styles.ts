/*
 * @Author: czy0729
 * @Date: 2022-09-29 06:31:28
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-29 06:31:28
 */
import { _ } from '@stores'

const num = 3

export const memoStyles = _.memoStyles(() => {
  const gridStyles = _.grid(num)
  return {
    contentContainerStyle: {
      paddingBottom: _.bottom
    },
    item: {
      width: gridStyles.width,
      marginBottom: gridStyles.marginLeft,
      marginLeft: gridStyles.marginLeft
    }
  }
})
