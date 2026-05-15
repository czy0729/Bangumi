/*
 * @Author: czy0729
 * @Date: 2024-01-22 12:17:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-16 04:35:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const W_BGS = Math.floor((_.window.contentWidth - _.md) / 2)
  const H_BGS = Math.floor(W_BGS * 0.72)

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
      top: H_BGS / 2 - 14,
      left: 0,
      right: 0,
      opacity: 0.8
    }
  }
})
