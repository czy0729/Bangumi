/*
 * @Author: czy0729
 * @Date: 2022-09-10 17:54:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 15:53:32
 */
import { _ } from '@stores'
import { IMG_WIDTH_LG, IMG_HEIGHT_LG } from '@constants'

export const memoStyles = _.memoStyles(() => {
  const height = IMG_HEIGHT_LG * 0.58
  return {
    container: {
      paddingLeft: _.wind
    },
    wrap: {
      paddingVertical: _.md,
      paddingRight: _.wind
    },
    inView: {
      minWidth: IMG_WIDTH_LG,
      minHeight: IMG_HEIGHT_LG
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
