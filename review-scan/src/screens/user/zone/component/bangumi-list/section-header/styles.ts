/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:49:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-09 08:19:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  sectionHeader: {
    paddingHorizontal: _._wind,
    paddingBottom: _.md,
    backgroundColor: _.colorPlain
  },
  section: {
    backgroundColor: _.colorBg
  },
  arrow: {
    marginRight: -3
  }
}))
