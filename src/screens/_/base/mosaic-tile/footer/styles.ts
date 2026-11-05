/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:53:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 12:33:29
 *
 * 热力图底部样式
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  /** 与上方星期列左对齐 */
  footer: {
    marginLeft: _.wind,
    marginRight: _.wind - _._wind + _.sm
  },
  popover: {
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  trigger: {
    height: 24,
    paddingRight: 4
  }
}))
