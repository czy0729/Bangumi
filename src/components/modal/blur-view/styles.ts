/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 22:06:16
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const memoStyles = _.memoStyles(() => ({
  blurView: {
    paddingTop: 16,
    backgroundColor: _.select('rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.08)'),
    borderWidth: 0,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  view: {
    paddingTop: 16,
    backgroundColor: _.select(_.colorBg, _.deep(_._colorDarkModeLevel1, _._colorPlain)),
    borderWidth: 0,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
}))
