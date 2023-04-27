/*
 * @Author: czy0729
 * @Date: 2023-04-27 15:38:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-27 16:16:52
 */
import { _ } from '@stores'

export const NAMESPACE = 'ScreenDollars'

export const EXCLUDE_STATE = {
  /** 可视范围底部 y */
  visibleBottom: _.window.height,

  /** 发送中 */
  fething: false,

  /** 显示输入框 */
  show: false,

  /** 输入框 */
  text: ''
}
