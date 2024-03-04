/*
 * @Author: czy0729
 * @Date: 2022-11-07 18:45:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-05 04:33:43
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const { width, marginLeft } = _.grid(3)
  return {
    item: {
      width,
      marginVertical: _.sm,
      marginLeft
    }
  }
})
