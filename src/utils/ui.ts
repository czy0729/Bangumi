/*
 * @Author: czy0729
 * @Date: 2019-05-07 19:45:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-21 08:46:11
 */
import { NativeModules, Alert, Clipboard, Vibration } from 'react-native'
import * as Haptics from 'expo-haptics'
import Portal from '@ant-design/react-native/lib/portal'
import Toast from '@components/@/ant-design/toast'
import ActionSheet from '@components/@/ant-design/action-sheet'
import { DEV } from '@/config'
import { IOS } from '@constants/constants'
import { getSystemStoreAsync, s2tAsync } from './async'

/** Loading */
export function loading(text = 'Loading...', time = 0) {
  const toastId = Toast.loading(s2tAsync(text), time, () => {
    if (toastId) Portal.remove(toastId)
  })

  return () => {
    if (toastId) Portal.remove(toastId)
  }
}

/** 轻震动反馈 */
export function feedback() {
  const { vibration } = getSystemStoreAsync().setting
  if (!vibration) return

  if (DEV) console.info('vibration')

  if (IOS) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  } else {
    Vibration.vibrate(4)
  }
}

/** 确定框 */
export function confirm(
  content: string,
  onPress = () => {},
  title = '警告',
  onCancelPress = () => {},
  confirmText: string = '确定'
) {
  const params = [
    {
      text: s2tAsync('取消'),
      style: 'cancel' as const,
      onPress: onCancelPress
    },
    {
      text: s2tAsync(confirmText),
      onPress
    }
  ]

  // iOS 有时候在 popover 里面询问, 会触发屏幕假死, 需要延迟一下让菜单消失了再执行
  if (IOS) {
    setTimeout(() => {
      Alert.alert(s2tAsync(title), s2tAsync(content), params)
    }, 80)
    return
  }

  Alert.alert(s2tAsync(title), s2tAsync(content), params)
  return
}

/**
 * 提示
 * @param {*} content
 * @param {*} title default: '提示'
 */
export function alert(content: string, title: string = '提示') {
  const params = [
    {
      text: s2tAsync('确定'),
      onPress: () => {}
    }
  ]

  // iOS 有时候在 popover 里面询问, 会触发屏幕假死, 需要延迟一下让菜单消失了再执行
  if (IOS) {
    return setTimeout(() => {
      Alert.alert(s2tAsync(title), s2tAsync(content), params)
    }, 80)
  }

  return Alert.alert(s2tAsync(title), s2tAsync(content), params)
}

/**
 * 轻提示
 * @param {*} content
 * @param {*} duration
 */
export function info(
  content: string | number = '网络错误',
  duration: number = 2.4,
  onClose = () => {},
  mask = false
) {
  Toast.info(s2tAsync(content), duration, onClose, mask)
}

/**
 * [待废弃] 显示ActionSheet
 * https://rn.mobile.ant.design/components/action-sheet-cn/
 * @param {*} options
 * @param {*} callback
 */
export function showActionSheet(
  options = [],
  callback = Function.prototype,
  // @ts-ignore
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
 * 显示 ImageViewer
 * @param {*} imageUrls
 */
export function showImageViewer(
  imageUrls: {
    url?: any
    _url?: any
    headers?: object
  }[] = [],
  index: number = 0,
  mini: boolean = false
) {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) return

  getSystemStoreAsync().showImageViewer(
    imageUrls.map(item => ({
      ...item,
      url:
        typeof item.url === 'string'
          ? item.url.replace('http://', 'https://')
          : item.url,
      _url:
        typeof item._url === 'string'
          ? item._url.replace('http://', 'https://')
          : item._url
    })),
    index,
    mini
  )
}

/**
 * 调整键盘模式
 * https://github.com/zubricky/react-native-android-keyboard-adjust
 * @param {String} fn 函数名 setAdjustPan | setAdjustResize
 */
export function androidKeyboardAdjust(fn: 'setAdjustPan' | 'setAdjustResize') {
  if (IOS) return

  const AndroidKeyboardAdjust = require('react-native-android-keyboard-adjust')
  AndroidKeyboardAdjust[fn]()
}

/**
 * 安卓原生切换白天黑夜标志, 用于动态改变原生弹窗主题颜色
 * @param {*} isDark
 */
export function androidDayNightToggle(isDark?: boolean) {
  if (IOS) return

  NativeModules.DayNight.setDarkMode(isDark ? 2 : 1)
}

/**
 * 复制到剪贴板
 * @param val
 * @param message
 * @param ms
 */
export function copy(val: any, message: boolean | string = true, ms?: number) {
  const string = String(val)
  Clipboard.setString(string)

  if (message === true) {
    info(`已复制 ${string}`, ms)
  } else if (typeof message === 'string') {
    info(message, ms)
  }

  feedback()
}
