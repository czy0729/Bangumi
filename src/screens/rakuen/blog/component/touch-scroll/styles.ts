/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:19:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 05:47:00
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
  itemNew: {
    backgroundColor: _.select('rgba(254, 138, 149, 0.64)', 'rgba(254, 113, 127, 0.16)')
  },
  text: {
    width: '100%'
  }
}))
