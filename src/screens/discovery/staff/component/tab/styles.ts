/*
 * @Author: czy0729
 * @Date: 2026-10-16 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-16 00:00:00
 *
 * 切换条样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  segment: {
    width: _.r(120),
    height: _.r(24),
    marginRight: _.sm
  }
}))
