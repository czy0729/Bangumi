/*
 * @Author: czy0729
 * @Date: 2026-09-30 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 00:00:00
 */
import { _ } from '@stores'
import { THUMB_HEIGHT } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  thumbs: {
    height: THUMB_HEIGHT,
    marginTop: _.md
  },
  nums: {
    width: THUMB_HEIGHT,
    height: THUMB_HEIGHT,
    marginRight: _._wind,
    marginLeft: _.sm,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
