/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:21:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-06 13:22:51
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const { width } = _.grid(3)
  const imageHeight = width * 1.28
  const imageResizeWidth = width * 1.2
  const imageResizeHeight = imageHeight * 1.2
  return {
    wrap: {
      width,
      height: imageHeight,
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    image: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      marginLeft: -(imageResizeWidth - width) / 2
    },
    imageResize: {
      width: imageResizeWidth,
      height: imageResizeHeight
    },
    refine: {
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
      minWidth: 28,
      padding: 2,
      paddingBottom: 4,
      borderBottomRightRadius: _.radiusSm,
      overflow: 'hidden'
    }
  }
})
