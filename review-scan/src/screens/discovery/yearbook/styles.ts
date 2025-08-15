/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:48:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-04 02:07:26
 */
import { _ } from '@stores'

const NUM = 1

export const memoStyles = _.memoStyles(() => {
  const width = Math.floor((_.window.width - 2 * _.wind - _.md * (NUM - 1)) / NUM)
  return {
    container: {
      paddingTop: _.headerHeight + _.sm,
      paddingHorizontal: _.wind,
      paddingBottom: _.bottom
    },
    item2021: {
      width,
      height: Math.floor(width * 0.4),
      backgroundColor: '#ebf3ec'
    }
  }
})
