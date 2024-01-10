/*
 * @Author: czy0729
 * @Date: 2022-07-18 09:43:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:39:55
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  btns: {
    paddingHorizontal: _.xs,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  btn: {
    width: 64,
    height: 56,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  btnActive: {
    borderColor: _.colorSuccess
  },
  icon: {
    height: 26
  }
}))
