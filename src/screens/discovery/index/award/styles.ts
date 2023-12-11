/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:32:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-09 23:22:27
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
    item: {
      width: widthLg,
      height: width,
      marginRight: _.md
    },
    item2020: {
      backgroundColor: 'rgb(236, 243, 236)'
    },
    item2019: {
      paddingLeft: 18,
      backgroundColor: 'rgb(54, 63, 69)'
    },
    item2018: {
      paddingLeft: 10,
      backgroundColor: 'rgb(0, 0, 0)'
    },
    itemMore: {
      width,
      height: width,
      backgroundColor: _.select(_.colorDesc, _._colorDarkModeLevel1)
    }
  }
})
