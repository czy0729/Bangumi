/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:41:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:18:21
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
  open: {
    padding: _.sm,
    marginRight: -_.sm,
    marginLeft: _.sm,
    borderRadius: 20,
    overflow: 'hidden'
  }
}))
