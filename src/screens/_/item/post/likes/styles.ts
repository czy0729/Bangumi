/*
 * @Author: czy0729
 * @Date: 2023-03-31 06:13:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-31 08:11:42
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    marginTop: _.md
  },
  item: {
    height: 24,
    paddingHorizontal: 8,
    marginRight: _.sm,
    backgroundColor: _.colorBg,
    borderRadius: 16
  }
}))
