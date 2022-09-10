/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:32:58
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-09-09 22:32:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = _.device(128, 164)
  const widthLg = width * 2 + 16
  return {
    container: {
      paddingVertical: _.md,
      paddingHorizontal: _.windSm
    },
    item2021: {
      width: widthLg,
      height: width,
      marginRight: _.md,
      backgroundColor: '#ebf3ec',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2020: {
      width: widthLg,
      height: width,
      marginRight: _.md,
      backgroundColor: 'rgb(236, 243, 236)',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2019: {
      width: widthLg,
      height: width,
      paddingLeft: 20,
      marginRight: _.md,
      backgroundColor: 'rgb(54, 63, 69)',
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item2018: {
      width: widthLg,
      height: width,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    item: {
      width,
      height: width,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1),
      borderRadius: _.radiusMd
    }
  }
})
