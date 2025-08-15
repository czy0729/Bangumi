/*
 * @Author: czy0729
 * @Date: 2022-09-12 16:20:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 15:24:46
 */
import { _ } from '@stores'
import { IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => {
  const height = IMG_HEIGHT_LG * 0.8
  return {
    container: {
      paddingLeft: _.wind
    },
    wrap: {
      paddingVertical: _.md,
      paddingRight: _.wind
    },
    content: {
      height
    },
    loading: {
      height: IMG_HEIGHT_LG
    },
    bottom: {
      marginTop: IMG_HEIGHT_LG - height - 16
    }
  }
})
