/*
 * @Author: czy0729
 * @Date: 2019-05-07 19:45:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-07 19:56:16
 */
import { Toast } from '@ant-design/react-native'

/**
 * 轻提示
 * @param {*} content
 * @param {*} duration
 */
export function info(
  content,
  duration = 4,
  onClose = Function.prototype,
  mask = false
) {
  Toast.info(content, duration, onClose, mask)
}
