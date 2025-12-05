/*
 * @Author: czy0729
 * @Date: 2022-06-06 05:26:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-28 07:18:22
 */
import { _ } from '@stores'
import { IS_IOS_5_6_7_8 } from '@styles'
import { H_RADIUS_LINE } from '../../ds'

export const memoStyles = _.memoStyles(() => {
  const backgroundColor = _.select(
    _.colorPlain,
    _.deepDark ? _._colorPlain : _._colorDarkModeLevel1
  )
  return {
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
    parallaxImage: {
      marginTop: -8,
      height: _.parallaxImageHeight + 8,
      backgroundColor
    },
    head: {
      marginTop: _.device((_.parallaxImageHeight - 120) / 2, 80)
    }
  }
})

export const styles = _.create({
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
    left: 0
  },
  parallaxMask: {
    backgroundColor: 'rgba(0, 0, 0, 0.24)'
  },
  title: {
    position: 'absolute',
    left: '50%',
    width: 240,
    bottom: H_RADIUS_LINE + 10,
    transform: [
      {
        translateX: -120
      }
    ]
  },
  back: {
    ..._.header.left,
    zIndex: 1,
    marginTop: _.ios(IS_IOS_5_6_7_8 ? -6 : -7, -4)
  },
  menu: {
    ..._.header.left,
    zIndex: 1,
    padding: _.sm,
    marginTop: _.ios(IS_IOS_5_6_7_8 ? -14 : -16, -12),
    marginLeft: -4,
    opacity: 0.88
  },
  more: {
    ..._.header.right,
    zIndex: 1,
    marginTop: _.ios(-6, -4),
    opacity: 0.88
  },
  timeline: {
    ..._.header.right,
    zIndex: 1,
    marginTop: _.ios(IS_IOS_5_6_7_8 ? -6 : -6, -4),
    marginRight: _.device(44, 54),
    opacity: 0.88
  },
  setting: {
    ..._.header.right,
    zIndex: 1,
    marginTop: _.ios(IS_IOS_5_6_7_8 ? -6 : -6, -4),
    opacity: 0.88
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
})
