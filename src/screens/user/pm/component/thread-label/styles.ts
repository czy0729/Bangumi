/*
 * @Author: czy0729
 * @Date: 2026-07-08 04:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-08 04:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  section: {
    marginVertical: _.md,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: _.select(_.colorBg, _.colorDarkModeLevel2),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  highlightOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: _.colorMain,
    borderRadius: _.radiusSm
  }
}))
