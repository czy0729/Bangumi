/*
 * @Author: czy0729
 * @Date: 2026-05-15 05:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 05:02:54
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
  },
  content: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 4,
    marginRight: _._wind,
    marginLeft: _._wind + 34 + _.sm,
    backgroundColor: _.colorBg,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
