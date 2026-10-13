/*
 * @Author: czy0729
 * @Date: 2022-09-02 14:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 好友最近关注样式
 */
import { _ } from '@stores'
import { GAP } from '../ds'

export const memoStyles = _.memoStyles(() => ({
  grid: {
    marginTop: GAP,
    marginHorizontal: _.wind
  }
}))
