/*
 * @Author: czy0729
 * @Date: 2022-05-17 06:41:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-25 07:14:18
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  image: {
    paddingVertical: _.ios(4, 0),
    marginTop: 4,
    marginBottom: 4
  },
  isLoad: {
    width: Math.floor(_.window.contentWidth * 0.64),
    height: 64,
    borderRadius: _.radiusSm
  },
  placeholder: {
    width: Math.floor(_.window.contentWidth * 0.64),
    height: 64,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  src: {
    maxWidth: '72%',
    marginTop: _.xs
  },
  loading: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  remote: {
    zIndex: 2
  },
  close: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0
  },
  closeTouch: {
    width: 52,
    height: 52
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 10,
    top: 10,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.28)',
    overflow: 'hidden'
  }
}))
