/*
 * @Author: czy0729
 * @Date: 2022-08-05 10:32:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 09:23:52
 */
import { DEV } from '@constants'
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const H_BG = Math.floor(_.window.contentWidth * 0.88)
  const W_BGS = Math.floor((_.window.width - _.md - _._wind * 2) / 2)
  const H_BGS = W_BGS * 0.88
  return {
    container: {
      marginHorizontal: _.wind
    },
    mask: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.24)'
    },
    blurView: {
      backgroundColor: _.colorPlain,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    avatar: {
      marginTop: _.md,
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    },
    contentContainerStyle: {
      paddingHorizontal: _.wind,
      paddingBottom: _.bottom
    },
    bg: {
      width: W_BGS,
      height: H_BGS,
      marginBottom: _.md
    },
    input: {
      height: 44,
      paddingVertical: 0,
      paddingRight: 40,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    preview: {
      height: H_BG
    },
    image: {
      width: W_BGS,
      height: H_BGS
    },
    example: {
      position: 'absolute',
      zIndex: 2,
      right: _.wind + _.md,
      bottom: _.sm,
      opacity: 0.64
    },
    more: {
      paddingBottom: _.md,
      borderRadius: _.radiusSm,
      overflow: 'hidden'
    },
    btn: {
      position: 'absolute',
      zIndex: 1001,
      right: _.wind,
      bottom: DEV ? 240 : 64
    },
    touch: {
      backgroundColor: _.colorTitle,
      borderRadius: 20,
      overflow: 'hidden',
      opacity: 0.8
    },
    icon: {
      width: 40,
      height: 40
    },
    segment: {
      width: _.r(_.window.contentWidth),
      height: _.r(36),
      marginBottom: _.md + 16
    },
    blurText: {
      position: 'absolute',
      zIndex: 1,
      top: 64,
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
