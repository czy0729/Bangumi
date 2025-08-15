/*
 * @Author: czy0729
 * @Date: 2022-11-11 06:16:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 16:03:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const { width } = _.grid(3)
  const imageHeight = Math.floor(width * 1.28)
  return {
    temples: {
      paddingTop: _.md,
      paddingHorizontal: _.wind - _._wind
    },
    placeholder: {
      width,
      height: imageHeight,
      marginLeft: _.md - 4
    }
  }
})
