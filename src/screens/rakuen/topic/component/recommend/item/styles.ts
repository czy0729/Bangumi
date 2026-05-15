/*
 * @Author: czy0729
 * @Date: 2026-05-15 05:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-15 21:53:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  item: {
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: _._wind,
    marginTop: _.sm
  },
  avatar: {
    marginTop: 1
  }
}))
