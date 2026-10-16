/*
 * @Author: czy0729
 * @Date: 2022-08-28 00:26:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:17:18
 */
import { _ } from '@stores'

/** 子条目左边距 (与主条目文字对齐) */
const subPaddingLeft = _._wind + _.device(_.sm, _.md)

export const styles = _.create({
  sub: {
    marginTop: -_.sm,
    paddingLeft: subPaddingLeft
  },
  subItem: {
    paddingVertical: _.md
  },
  more: {
    paddingVertical: _.md,
    marginLeft: -subPaddingLeft,
    alignItems: 'center'
  }
})
