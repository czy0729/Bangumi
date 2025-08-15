/*
 * @Author: czy0729
 * @Date: 2024-04-03 23:26:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-03 23:26:19
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = 1
  const width = (_.window.width - 2 * _.wind - _.md * (num - 1)) / num
  const height = width * 0.4
  return {
    item2021: {
      width,
      height,
      backgroundColor: '#ebf3ec'
    },
    item2020: {
      width,
      height,
      backgroundColor: 'rgb(236, 243, 236)'
    },
    item2019: {
      width,
      height,
      backgroundColor: 'rgb(54, 63, 69)'
    },
    item2018: {
      width,
      height
    }
  }
})
