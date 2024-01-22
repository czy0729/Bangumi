/*
 * @Author: czy0729
 * @Date: 2024-01-22 12:17:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-22 14:45:10
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const W_BGS = Math.floor((_.window.width - _.md - _._wind * 2) / 2)
  const H_BGS = W_BGS * 0.72
  return {
    bg: {
      width: W_BGS,
      height: H_BGS,
      marginBottom: _.md
    },
    image: {
      width: W_BGS,
      height: H_BGS
    },
    blurText: {
      position: 'absolute',
      zIndex: 1,
      top: 52,
      left: 0,
      right: 0,
      textShadowOffset: {
        width: 1,
        height: 1
      },
      textShadowRadius: 1,
      textShadowColor: 'rgba(0, 0, 0, 0.24)',
      opacity: 0.8
    }
  }
})
