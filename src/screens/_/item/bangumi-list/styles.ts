/*
 * @Author: czy0729
 * @Date: 2022-06-16 23:13:33
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-16 23:13:33
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = _.portrait(5, 7)
  const { width, marginLeft } = _.grid(num)
  return {
    item: {
      width,
      marginBottom: _.portrait(_.sm, _.md),
      marginLeft
    }
  }
})
