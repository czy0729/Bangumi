/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:32:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-26 07:13:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = _.device(128, 164)
  const widthLg = width * 2 + 16
  return {
    item: {
      width: widthLg,
      height: width,
      marginRight: _.md
    },
    item2022: {
      backgroundColor: 'rgb(255, 255, 255)'
    },
    item2021: {
      backgroundColor: 'rgb(236, 243, 236)'
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
    }
  }
})
