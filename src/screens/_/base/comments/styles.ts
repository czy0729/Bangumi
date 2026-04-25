/*
 * @Author: czy0729
 * @Date: 2025-01-24 05:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-25 22:57:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  comments: {
    paddingTop: _.select(10, 12),
    paddingHorizontal: _.select(12, 14),
    paddingBottom: _.select(12, 14),
    marginTop: _.md,
    marginBottom: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0),
    borderColor: _.colorIcon,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
}))
