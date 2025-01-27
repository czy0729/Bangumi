/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:31:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-27 15:54:49
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const height = _.device(128, 164)
  const width = height * 2 + 16
  return {
    container: {
      height,
      marginRight: _.md
    },
    item: {
      width: _.device(128, 164) * 2 + 16,
      height: _.device(128, 164),
      backgroundColor: '#000'
    },
    body: {
      width,
      height,
      backgroundColor: '#000'
    }
  }
})
