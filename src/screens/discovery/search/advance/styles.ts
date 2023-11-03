/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:41:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 05:07:12
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingHorizontal: _.wind
  },
  content: {
    paddingVertical: _.xs
  },
  search: {
    padding: _.sm,
    borderRadius: 20,
    overflow: 'hidden'
  },
  open: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.sm,
    borderRadius: 20,
    overflow: 'hidden'
  }
}))
