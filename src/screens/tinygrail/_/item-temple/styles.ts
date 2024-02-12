/*
 * @Author: czy0729
 * @Date: 2022-11-07 18:45:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 18:37:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const { width, marginLeft } = _.grid(3)
  const imageHeight = width * 1.28
  const imageResizeWidth = width * 1.2
  const imageResizeHeight = imageHeight * 1.2
  return {
    item: {
      width,
      marginVertical: _.sm,
      marginLeft
    },
    wrap: {
      width,
      height: imageHeight,
      borderRadius: _.radiusXs,
      overflow: 'hidden'
    },
    image: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      marginLeft: -(imageResizeWidth - width) / 2,
      backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
    },
    imageResize: {
      width: imageResizeWidth,
      height: imageResizeHeight
    },
    fixed: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      width: 36,
      height: 36,
      marginTop: -36,
      marginLeft: -6,
      backgroundColor: _.colorTinygrailContainer
    }
  }
})
