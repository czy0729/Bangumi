/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:41:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 13:42:06
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
    borderRadius: 20,
    overflow: 'hidden'
  }
}))
