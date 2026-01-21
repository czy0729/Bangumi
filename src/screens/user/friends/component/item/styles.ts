/*
 * @Author: czy0729
 * @Date: 2024-04-12 02:16:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 19:09:15
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = _.portrait(5, 8)
  const { width, marginLeft } = _.grid(num)

  return {
    item: {
      width,
      marginBottom: _.md,
      marginLeft: marginLeft + 1
    },
    inView: {
      minWidth: width,
      minHeight: width
    }
  }
})
