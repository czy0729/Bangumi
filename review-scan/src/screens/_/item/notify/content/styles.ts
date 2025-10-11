/*
 * @Author: czy0729
 * @Date: 2022-06-17 19:03:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-19 17:24:58
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  info: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: _.sm,
    backgroundColor: _.colorBg,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
