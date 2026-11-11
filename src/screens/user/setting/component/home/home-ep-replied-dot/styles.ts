/*
 * @Author: czy0729
 * @Date: 2026-11-11 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 00:00:00
 *
 * 章节标记参与过的讨论样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  dot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 4,
    height: 4,
    backgroundColor: _.__colorPlain__,
    borderRadius: 4,
    opacity: _.select(0.75, 0.64)
  }
}))
