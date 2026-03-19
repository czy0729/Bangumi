/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:13:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:40:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = _.portrait(5, 7)
  const { width, marginLeft } = _.grid(num)

  return {
    item: {
      width,
      marginBottom: _.md,
      marginLeft
    }
  }
})
