/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:19:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 楼层进度条样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  itemVertical: {
    width: 16,
    height: '100%'
  },
  itemHorizontal: {
    width: '100%',
    height: '100%'
  },
  text: {
    width: '100%'
  }
}))
