/*
 * @Author: czy0729
 * @Date: 2024-01-22 01:13:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-22 14:42:39
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  blurView: {
    backgroundColor: _.colorPlain,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  preview: {
    height: Math.floor(_.window.contentWidth * 0.72),
    marginBottom: _.sm
  },
  mask: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.24)',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  avatar: {
    marginTop: _.md,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  example: {
    position: 'absolute',
    zIndex: 2,
    right: 12,
    bottom: 12,
    opacity: 0.72
  }
}))
