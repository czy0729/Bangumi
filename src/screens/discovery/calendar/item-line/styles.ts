/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-08 23:40:55
 */
import { _ } from '@stores'
import { IMG_WIDTH_SM, IMG_HEIGHT_SM, IMG_WIDTH, IMG_HEIGHT } from '@constants'

export const memoStyles = _.memoStyles(() => {
  const height = _.web(IMG_HEIGHT, IMG_HEIGHT_SM)
  return {
    item: {
      width: '100%',
      paddingVertical: 12,
      paddingRight: _._wind
    },
    inView: {
      minWidth: _.web(IMG_WIDTH, IMG_WIDTH_SM),
      minHeight: height
    },
    time: {
      width: _.r(72),
      paddingLeft: _._wind,
      marginTop: 2
    },
    body: {
      width: '100%',
      height: height - 4,
      paddingTop: 2
    },
    katakanas: {
      marginTop: -10
    },
    undetermined: {
      zIndex: 1,
      paddingVertical: _.sm
    }
  }
})
