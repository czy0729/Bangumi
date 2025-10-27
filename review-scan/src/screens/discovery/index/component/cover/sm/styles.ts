/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:34:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 06:01:34
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = _.windowSm.contentWidth * _.device(0.34, 0.42)
  return {
    item: {
      marginRight: _._wind + 2
    },
    cover: {
      width,
      height: width * 1.38
    },
    linear: {
      position: 'absolute',
      zIndex: 1,
      height: 96,
      right: 0,
      bottom: 0,
      left: 0,
      marginBottom: -0.5
    },
    linearMusic: {
      bottom: -32
    },
    desc: {
      position: 'absolute',
      zIndex: 2,
      right: _._wind - 4,
      bottom: 14,
      left: _._wind - 4,
      opacity: 0.92
    },
    itemStyle: {
      marginTop: -6
    },
    itemSecondStyle: {
      marginTop: 0
    }
  }
})
