/*
 * @Author: czy0729
 * @Date: 2022-09-10 07:11:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 06:01:28
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = Math.max(100, _.windowSm.contentWidth * _.device(0.26, 0.298))
  const margin = _.device(_._wind, _.md)
  return {
    item: {
      marginRight: margin
    },
    cover: {
      width,
      height: width * 1.38
    },
    linear: {
      position: 'absolute',
      zIndex: 1,
      top: '50%',
      right: 0,
      bottom: 0,
      left: 0,
      marginBottom: -0.5
    },
    info: {
      position: 'absolute',
      zIndex: 2,
      right: _.sm + 4,
      bottom: _.sm + 2,
      left: _.sm + 4,
      opacity: 0.92
    },
    itemStyle: {
      marginTop: -7
    },
    itemSecondStyle: {
      marginTop: -3
    }
  }
})
