/*
 * @Author: czy0729
 * @Date: 2026-03-12 20:34:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 20:41:25
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  parallaxBg: {
    height: _.parallaxImageHeight + 8,
    marginTop: -8,
    backgroundColor: _.select(_.colorPlain, _.deepDark ? _._colorPlain : _._colorDarkModeLevel1),
    overflow: 'hidden'
  },
  parallaxImage: {
    width: '100%',
    height: '100%'
  }
}))
