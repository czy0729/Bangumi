/*
 * @Author: czy0729
 * @Date: 2023-02-13 15:49:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-13 15:50:22
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  sectionHeader: {
    paddingHorizontal: _._wind,
    backgroundColor: _.colorPlain
  },
  section: {
    backgroundColor: _.colorBg
  },
  arrow: {
    marginRight: -3
  }
}))
