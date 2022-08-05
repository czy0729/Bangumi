/*
 * @Author: czy0729
 * @Date: 2022-08-05 10:32:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-05 11:19:41
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const H_BG = Math.floor(_.window.contentWidth * 0.88)
  const W_BGS = Math.floor((_.window.width - _.md - _._wind * 2) / 2)
  const H_BGS = W_BGS * 0.88
  return {
    container: {
      marginHorizontal: _.wind,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
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
    avatar: {
      backgroundColor: _.__colorPlain__
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
      paddingRight: 32,
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
      zIndex: 1000,
      right: _.wind,
      bottom: 64
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
    }
  }
})
