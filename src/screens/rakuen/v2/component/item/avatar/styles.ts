/*
 * @Author: czy0729
 * @Date: 2023-12-11 20:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-30 00:00:00
 *
 * 条目头像样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  avatar: {
    marginTop: _.web(8, _.md - 5)
  },
  placeholder: {
    width: _.r(40),
    height: _.r(40),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  }
}))
