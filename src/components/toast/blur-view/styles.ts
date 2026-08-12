/*
 * @Author: czy0729
 * @Date: 2026-08-12 07:20:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 07:20:00
 */
import { syncThemeStore } from '@utils/async'

const _ = syncThemeStore()

export const memoStyles = _.memoStyles(() => ({
  blurView: {
    backgroundColor: _.select('rgba(255, 255, 255, 0.4)', 'rgba(255, 255, 255, 0.08)'),
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  view: {
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
    borderRadius: _.radiusSm,
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorBorder,
    overflow: 'hidden'
  }
}))
