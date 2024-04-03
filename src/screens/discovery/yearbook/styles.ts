/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:48:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 02:07:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = 1
  const width = (_.window.width - 2 * _.wind - _.md * (num - 1)) / num
  const height = width * 0.4
  return {
    container: {
      paddingTop: _.sm,
      paddingHorizontal: _.wind,
      paddingBottom: _.bottom
    },
    item2021: {
      width,
      height,
      backgroundColor: '#ebf3ec'
    }
  }
})
