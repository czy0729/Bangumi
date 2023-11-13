/*
 * @Author: czy0729
 * @Date: 2023-03-31 06:13:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-01 06:50:17
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.sm,
    height: 48
  },
  item: {
    height: 28,
    paddingHorizontal: 8,
    marginRight: _.sm,
    backgroundColor: _.colorBg,
    borderRadius: 16
  },
  itemActive: {
    backgroundColor: _.colorMainLight
  }
}))
