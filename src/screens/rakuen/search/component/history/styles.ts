/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:38:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  history: {
    paddingHorizontal: _.wind,
    paddingTop: _.sm
  },
  chip: {
    paddingLeft: _.sm,
    paddingRight: 4,
    paddingVertical: 6,
    marginRight: _.sm,
    marginBottom: _.sm,
    borderRadius: 6,
    backgroundColor: _.colorBg
  },
  close: {
    paddingHorizontal: 4,
    paddingVertical: 2
  }
}))
