/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:48:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 04:00:54
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = 1
  const width = (_.window.width - 2 * _.wind - _.md * (num - 1)) / num
  const height = width * 0.4

  const numSm = 2
  const widthSm = (_.window.width - 2 * _.wind - _.md * (numSm - 1)) / numSm
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
    },
    item: {
      marginTop: _.md,
      marginLeft: _.md
    },
    itemBody: {
      width: widthSm,
      height: widthSm,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1)
    },
    side: {
      marginLeft: 0
    }
  }
})
