/*
 * @Author: czy0729
 * @Date: 2022-06-20 15:48:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-21 07:27:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const margin = 10
  const numColumns = _.isMobileLanscape ? 9 : _.device(4, 5)
  const imageWidth = (_.window.contentWidth - (numColumns - 1) * margin) / numColumns
  return {
    item: {
      width: imageWidth,
      marginLeft: margin,
      marginBottom: margin
    },
    active: {
      opacity: 0.5
    }
  }
})
