/*
 * @Author: czy0729
 * @Date: 2026-04-20 20:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 21:19:27
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  title: {
    height: 16,
    paddingLeft: _.xs
  },
  split: {
    width: 2,
    height: 6,
    marginHorizontal: 12,
    borderRadius: 4,
    backgroundColor: _.colorIcon
  }
}))
