/*
 * @Author: czy0729
 * @Date: 2022-09-10 08:09:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:55:19
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    marginTop: _.md,
    marginHorizontal: _.windSm
  },
  cover: {
    width: _.windowSm.contentWidth,
    height: Math.floor(_.windowSm.contentWidth * 1.38)
  },
  desc: {
    position: 'absolute',
    zIndex: 4,
    right: _._wind - 2,
    bottom: 14,
    left: _._wind - 2,
    opacity: 0.92
  }
}))
