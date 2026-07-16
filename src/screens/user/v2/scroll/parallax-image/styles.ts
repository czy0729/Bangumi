/*
 * @Author: czy0729
 * @Date: 2022-06-06 05:26:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 05:45:40
 */
import { _ } from '@stores'
import { H_RADIUS_LINE } from '../../ds'

export const memoStyles = _.memoStyles(() => {
  const height = _.parallaxImageHeight + H_RADIUS_LINE / 2
  const backgroundColor = _.select(
    _.colorPlain,
    _.deepDark ? _._colorPlain : _._colorDarkModeLevel1
  )

  return {
    head: {
      height,
      paddingTop: H_RADIUS_LINE,
      overflow: 'hidden'
    },
    parallaxBg: {
      height,
      marginTop: -(H_RADIUS_LINE / 2),
      backgroundColor,
      overflow: 'hidden'
    },
    parallaxLine: {
      position: 'absolute',
      right: 0,
      bottom: -1,
      left: 0,
      height: H_RADIUS_LINE,
      backgroundColor,
      borderTopLeftRadius: H_RADIUS_LINE,
      borderTopRightRadius: H_RADIUS_LINE,
      overflow: 'hidden'
    },
    parallax: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      right: 0,
      left: 0
    },
    parallaxWrap: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: -2,
      left: 0,
      overflow: 'hidden'
    },
    parallaxMask: {
      backgroundColor: 'rgba(0, 0, 0, 0.24)'
    },
    title: {
      position: 'absolute',
      left: '50%',
      width: 240,
      bottom: H_RADIUS_LINE + 12,
      transform: [
        {
          translateX: -120
        }
      ]
    },
    sensor: {
      position: 'absolute',
      zIndex: 1,
      bottom: _.lg,
      right: 11,
      opacity: 0.8
    },
    avatar: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
  }
})
