/*
 * @Author: czy0729
 * @Date: 2025-12-17 01:43:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 01:51:13
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 10,
    marginRight: 10,
    backgroundColor: _.colorBg,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm
  }
}))
