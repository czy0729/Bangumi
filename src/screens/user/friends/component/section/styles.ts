/*
 * @Author: czy0729
 * @Date: 2026-01-21 09:24:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-21 09:38:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  sectionHeader: {
    width: _.window.width,
    marginBottom: _.md
  },
  arrow: {
    marginRight: -3
  }
}))
