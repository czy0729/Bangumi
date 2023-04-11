/*
 * @Author: czy0729
 * @Date: 2022-09-27 23:48:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:52:43
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const num = _.portrait(1, 2)
  const width = (_.window.width - 2 * _.wind - _.md * (num - 1)) / num
  const height = width * 0.4

  const numSm = _.portrait(2, 4)
  const widthSm = (_.window.width - 2 * _.wind - _.md * (numSm - 1)) / numSm
  return {
    container: {
      paddingHorizontal: _.wind,
      paddingBottom: _.bottom
    },
    item2021: {
      width,
      height,
      marginTop: _.md,
      backgroundColor: '#ebf3ec',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2020: {
      width,
      height,
      marginTop: _.md,
      backgroundColor: 'rgb(236, 243, 236)',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2019: {
      width,
      height,
      marginTop: _.md,
      marginLeft: num === 2 ? _.md : 0,
      backgroundColor: 'rgb(54, 63, 69)',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2018: {
      width,
      height,
      marginTop: _.md,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item: {
      width: widthSm,
      height: widthSm,
      marginTop: _.md,
      marginLeft: _.md,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
      borderRadius: _.radiusMd
    },
    left: {
      marginLeft: 0
    }
  }
})
