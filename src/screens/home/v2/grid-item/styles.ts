/*
 * @Author: czy0729
 * @Date: 2022-06-20 15:48:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-20 08:34:35
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const margin = 10
  const numColumns = _.isMobileLanscape ? 9 : _.device(4, 5)
  const imageWidth = (_.window.contentWidth - (numColumns - 1) * margin) / numColumns
  return {
    item: {
      width: imageWidth,
      marginLeft: margin,
      marginBottom: margin
    },
    active: {
      opacity: 0.5
    },
    progress: {
      height: 7,
      marginTop: 2,
      borderRadius: _.radiusXs,
      backgroundColor: _.select('rgb(238, 238, 240)', _._colorDarkModeLevel1),
      overflow: 'hidden'
    },
    progressBar: {
      height: 7,
      backgroundColor: _.select('rgb(208, 208, 210)', 'rgba(255, 255, 255, 0.2)'),
      borderRadius: _.radiusXs,
      overflow: 'hidden'
    },
    progressActive: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      height: 7,
      backgroundColor: _.colorPrimary,
      borderRadius: _.radiusXs,
      overflow: 'hidden'
    }
  }
})
