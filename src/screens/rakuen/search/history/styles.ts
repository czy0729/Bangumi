/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:38:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 07:21:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingHorizontal: _.wind
  },
  content: {
    paddingVertical: _.sm
  },
  close: {
    padding: _.sm,
    marginLeft: _.md,
    marginRight: -_.sm
  }
}))
