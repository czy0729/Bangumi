/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:41:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 20:28:23
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: _.xs,
    paddingHorizontal: _.wind
  },
  itemId: {
    marginTop: _.md,
    marginBottom: _.sm
  },
  itemMono: {
    paddingVertical: _.sm,
    paddingHorizontal: _.wind
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
