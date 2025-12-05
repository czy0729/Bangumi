/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:41:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-17 02:16:40
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingHorizontal: _.wind
  },
  close: {
    padding: _.sm,
    marginLeft: _.md,
    borderRadius: 20,
    overflow: 'hidden'
  },
  clear: {
    paddingHorizontal: _.wind,
    marginTop: _.sm
  }
}))
