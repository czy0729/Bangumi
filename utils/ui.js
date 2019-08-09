/*
 * @Author: czy0729
 * @Date: 2019-05-07 19:45:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-09 10:51:53
 */
import { Toast } from '@ant-design/react-native'
import ActionSheet from '@components/@/ant-design/action-sheet'

/**
 * 轻提示
 * @param {*} content
 * @param {*} duration
 */
export function info(
  content = '网络错误',
  duration = 3,
  onClose = Function.prototype,
  mask = false
) {
  Toast.info(content, duration, onClose, mask)
}

/**
 * 显示ActionSheet
 * https://rn.mobile.ant.design/components/action-sheet-cn/
 * @param {*} options
 * @param {*} callback
 */
export function showActionSheet(
  options = [],
  callback = Function.prototype,
  { title, message, cancelButtonIndex, destructiveButtonIndex } = {}
) {
  ActionSheet.showActionSheetWithOptions(
    {
      title,
      message,
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    },
    callback
  )
}

/**
 * 显示ImageViewer
 * @param {*} imageUrls
 */
export function showImageViewer(imageUrls = []) {
  if (!Array.isArray(imageUrls) && imageUrls.length === 0) {
    return
  }

  const systemStore = require('../stores/system').default
  systemStore.showImageViewer(imageUrls)
}
