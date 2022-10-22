/*
 * @Author: czy0729
 * @Date: 2022-10-22 09:43:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-22 09:43:42
 */
import { _ } from '@stores'
import { H_RADIUS_LINE } from '../store'

export const memoStyles = _.memoStyles(() => ({
  parallax: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0
  },
  parallaxImage: {
    marginTop: -8,
    height: _.parallaxImageHeight + 8
  },
  parallaxWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: -2,
    left: 0
  },
  parallaxLine: {
    position: 'absolute',
    right: 0,
    bottom: -1,
    left: 0,
    height: H_RADIUS_LINE,
    backgroundColor: _.select(
      _.colorPlain,
      _.deepDark ? _._colorPlain : _._colorDarkModeLevel1
    ),
    borderTopLeftRadius: H_RADIUS_LINE,
    borderTopRightRadius: H_RADIUS_LINE,
    overflow: 'hidden'
  },
  head: {
    marginTop: (_.parallaxImageHeight - 120) / 2
  },
  title: {
    position: 'absolute',
    left: '50%',
    width: 240,
    bottom: H_RADIUS_LINE + 14,
    transform: [
      {
        translateX: -120
      }
    ]
  },
  back: {
    zIndex: 1,
    marginTop: _.platforms(-8, -8, -8, 0)
  },
  right: {
    zIndex: 1,
    marginTop: _.platforms(-6, -6, -6, 0)
  },
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 34,
    height: 36,
    marginRight: -2
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  }
}))
