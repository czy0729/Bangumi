/*
 * @Author: czy0729
 * @Date: 2022-07-18 09:43:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 15:58:11
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
    height: 58,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  btnActive: {
    borderColor: _.colorSuccess
  },
  icon: {
    height: 40,
    marginTop: -15
  }
}))
