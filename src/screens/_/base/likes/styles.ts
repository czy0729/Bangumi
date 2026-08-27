/*
 * @Author: czy0729
 * @Date: 2023-03-31 06:13:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 20:15:06
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    height: 48,
    paddingTop: _.sm,
    paddingRight: _.lg
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
