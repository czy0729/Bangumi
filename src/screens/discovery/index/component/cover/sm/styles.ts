/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:34:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:55:26
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const width = Math.floor(_.windowSm.contentWidth * 0.34)

  return {
    item: {
      marginRight: _._wind + 2
    },
    cover: {
      width,
      height: Math.floor(width * 1.38)
    },
    desc: {
      position: 'absolute',
      zIndex: 4,
      right: _._wind - 4,
      bottom: 10,
      left: _._wind - 4,
      opacity: 0.92
    }
  }
})
