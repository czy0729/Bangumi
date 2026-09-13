/*
 * @Author: czy0729
 * @Date: 2022-08-01 17:48:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 21:30:00
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  block: {
    marginVertical: _.sm,
    marginHorizontal: _.wind,
    backgroundColor: _.select(_.colorPlain, _.colorBg),
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  /** 上移一条细线的高度, 让第一行的细线被卡片圆角裁掉 */
  content: {
    marginTop: -_.hairlineWidth
  }
}))
