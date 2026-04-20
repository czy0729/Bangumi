/*
 * @Author: czy0729
 * @Date: 2025-04-10 06:57:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-10 07:51:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  split: {
    paddingBottom: 0,
    marginTop: 32
  },
  splitStyle1: {
    height: 1,
    marginHorizontal: _._wind - 2,
    backgroundColor: _.colorBorder
  }
}))
