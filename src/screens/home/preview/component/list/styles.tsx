/*
 * @Author: czy0729
 * @Date: 2022-10-21 13:28:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-06 15:53:45
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = Math.floor(_.window.width - (2 * _.wind - _._wind))
  const height = Math.floor(width * 0.56)

  return {
    item: {
      width,
      minHeight: height,
      marginLeft: _.sm,
      marginBottom: _.md
    }
  }
})
