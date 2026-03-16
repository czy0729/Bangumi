/*
 * @Author: czy0729
 * @Date: 2025-04-23 08:29:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 18:39:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    minHeight: _.r(32),
    marginTop: _.sm,
    marginBottom: _.xs
  },
  label: {
    maxWidth: Math.floor(_.window.contentWidth * 0.64),
    padding: 4,
    paddingRight: 10,
    marginRight: _.sm,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
