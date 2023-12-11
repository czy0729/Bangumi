/*
 * @Author: czy0729
 * @Date: 2023-01-22 06:05:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 04:18:20
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
    item2022: {
      width: _.device(128, 164) * 2 + 16,
      height: _.device(128, 164)
    },
    body: {
      width,
      height,
      backgroundColor: '#ffffff',
      opacity: 0.99
    }
  }
})
