/*
 * @Author: czy0729
 * @Date: 2022-07-18 09:43:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 20:56:10
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
    width: 60,
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
  },
  split: {
    width: 2,
    height: 12,
    marginHorizontal: 6,
    backgroundColor: _.select(_.colorIcon, '#777'),
    borderRadius: _.radiusSm,
    overflow: 'hidden',
    opacity: 0.64
  }
}))
