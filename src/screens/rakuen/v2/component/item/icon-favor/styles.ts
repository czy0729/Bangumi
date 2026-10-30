/*
 * @Author: czy0729
 * @Date: 2023-12-11 20:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 条目收藏标记样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  icon: {
    position: 'absolute',
    right: _.wind - _._wind + 13,
    bottom: 14
  }
}))
