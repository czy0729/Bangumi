/*
 * @Author: czy0729
 * @Date: 2026-03-18 03:24:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 03:25:41
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const memoStyles = _.memoStyles(() => ({
  blurView: {
    paddingTop: 20,
    backgroundColor: _.select('rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.08)'),
    borderRadius: _.radiusMd,
    borderWidth: 0,
    overflow: 'hidden'
  },
  view: {
    paddingTop: 20,
    backgroundColor: _.select(_.colorBg, _.deep(_._colorDarkModeLevel1, _._colorPlain)),
    borderRadius: _.radiusMd,
    borderWidth: 0,
    overflow: 'hidden'
  }
}))
