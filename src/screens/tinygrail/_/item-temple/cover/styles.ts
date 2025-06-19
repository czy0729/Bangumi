/*
 * @Author: czy0729
 * @Date: 2024-03-05 04:21:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 21:37:53
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const { width } = _.grid(3)
  const imageHeight = Math.floor(width * 1.28)
  const imageResizeWidth = Math.floor(width * 1.2)
  const imageResizeHeight = Math.floor(imageHeight * 1.2)
  return {
    wrap: {
      width,
      height: imageHeight,
      borderRadius: _.radiusXs,
      overflow: 'hidden'
    },
    image: {
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0,
      width,
      height: imageHeight
    },
    imageResize: {
      width: imageResizeWidth,
      height: imageResizeHeight,
      marginTop: -(imageResizeHeight - imageHeight) / 3,
      marginLeft: -(imageResizeWidth - width) / 2,
      backgroundColor: '#fff'
    },
    absolute: {
      position: 'absolute',
      zIndex: 2,
      top: 0,
      left: 0
    },
    refine: {
      position: 'absolute',
      zIndex: 2,
      top: -0.5,
      left: -0.5,
      minWidth: 28,
      padding: 2,
      paddingBottom: 4,
      borderBottomRightRadius: _.radiusXs,
      overflow: 'hidden'
    }
  }
})
