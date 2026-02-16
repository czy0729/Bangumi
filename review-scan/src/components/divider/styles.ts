/*
 * @Author: czy0729
 * @Date: 2022-05-03 17:44:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:29:46
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  divider: {
    width: '100%',
    paddingVertical: _.md
  },
  line: {
    width: 64,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
