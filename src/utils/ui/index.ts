/*
 * @Author: czy0729
 * @Date: 2019-05-07 19:45:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-10 17:21:26
 */
import { Alert, Clipboard, findNodeHandle, NativeModules, Vibration } from 'react-native'
import * as Haptics from 'expo-haptics'
import Portal from '@ant-design/react-native/lib/portal'
import ActionSheet from '@components/@/ant-design/action-sheet'
import { Toast } from '@components/toast'
import { IOS } from '@constants/constants'
import { WEB } from '@constants/device'
import { FROZEN_FN } from '@constants/init'
import { Fn } from '@types'
import { s2tAsync, syncSystemStore } from '../async'
import { log } from './utils'

/**
 * Loading 指示器
 * @param text 内容
 * @param time 指示器持续多少秒, 默认 0s
 * @param delay 延迟多少毫秒后显示, 默认 1000ms
 * @returns fn 取消函数
 */
export function loading(text: string = 'Loading...', time: number = 0, delay: number = 1000) {
  let toastId: number
  let timerId: any = setTimeout(() => {
    timerId = null
    toastId = Toast.loading(s2tAsync(text), time, () => {
      if (toastId) Portal.remove(toastId)
    })
  }, delay)

  return () => {
    if (timerId !== null) clearTimeout(timerId)
    if (toastId) Portal.remove(toastId)
  }
}

/** 轻震动反馈 */
export function feedback(light?: boolean) {
  if (WEB) return

  const { vibration } = syncSystemStore().setting
  if (!vibration) return

  log('feedback', 'vibration', light ? 'light' : '')

  if (IOS) {
    if (light) {
      Haptics.selectionAsync()
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  } else {
    Vibration.vibrate(light ? 2 : 4)
  }
}

/** 确定框 */
export function confirm(
  content: string,
  onPress = FROZEN_FN,
  title = '警告',
  onCancelPress = FROZEN_FN,
  confirmText: string = '确定',
  cancelText: string = '取消'
) {
  const alertTitle = s2tAsync(title)
  const alertContent = s2tAsync(content)
  const alertParams = [
    {
      text: s2tAsync(cancelText),
      style: 'cancel' as const,
      onPress: onCancelPress
    },
    {
      text: s2tAsync(confirmText),
      onPress
    }
  ]

  if (WEB) {
    setTimeout(() => {
      if (window.confirm(`${alertTitle}：${alertContent}`)) {
        onPress()
      } else {
        onCancelPress()
      }
    }, 80)
    return
  }

  // iOS 有时候在 popover 里面询问, 会触发屏幕假死, 需要延迟一下让菜单消失了再执行
  if (IOS) {
    setTimeout(() => {
      Alert.alert(alertTitle, alertContent, alertParams)
    }, 80)
    return
  }

  Alert.alert(alertTitle, alertContent, alertParams)
}

/** 提示 */
export function alert(content: string, title: string = '提示') {
  const alertTitle = s2tAsync(title)
  const alertContent = s2tAsync(content)
  const alertParams = [
    {
      text: s2tAsync('确定'),
      onPress: FROZEN_FN
    }
  ]

  if (WEB) {
    setTimeout(() => {
      window.alert(`${alertTitle}：\n${alertContent}`)
    }, 80)
    return
  }

  // iOS 有时候在 popover 里面询问, 会触发屏幕假死, 需要延迟一下让菜单消失了再执行
  if (IOS) {
    setTimeout(() => {
      Alert.alert(alertTitle, alertContent, alertParams)
    }, 80)
    return
  }

  Alert.alert(alertTitle, alertContent, alertParams)
}

/** 轻提示 */
export function info(
  content: string | number = '网络错误',
  duration: number = 2.4,
  onClose: Fn = FROZEN_FN,
  mask: boolean = false
) {
  Toast.info(s2tAsync(content), duration, onClose, mask)
}

/**
 * @deprecated 显示 ActionSheet
 * https://rn.mobile.ant.design/components/action-sheet-cn/
 */
export function showActionSheet(
  options = [] as string[] | readonly string[],
  callback = FROZEN_FN,
  // @ts-expect-error
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

/** 显示 ImageViewer */
export function showImageViewer(
  imageUrls: {
    url?: any
    _url?: any
    headers?: object
  }[] = [],
  index: number = 0,
  mini: boolean = false,
  useRN: boolean = false
) {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) return

  syncSystemStore().showImageViewer(imageUrls, index, mini, useRN)
}

/** 隐藏 ImageViewer */
export function closeImageViewer() {
  syncSystemStore().closeImageViewer()
}

/**
 * @deprecated 调整键盘模式
 * https://github.com/zubricky/react-native-android-keyboard-adjust
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function androidKeyboardAdjust(_fn: 'setAdjustPan' | 'setAdjustResize') {
  return
  // if (IOS || WEB) return
  // const AndroidKeyboardAdjust = require('react-native-android-keyboard-adjust')
  // AndroidKeyboardAdjust[fn]()
}

/** 安卓原生切换白天黑夜标志, 用于动态改变原生弹窗主题颜色 */
export function androidDayNightToggle(isDark?: boolean) {
  if (IOS || WEB) return

  NativeModules.DayNight.setDarkMode(isDark ? 2 : 1)
}

/** 复制到剪贴板 */
export function copy(val: any, message: boolean | string = true, ms?: number) {
  const string = String(val)
  Clipboard.setString(string)

  if (message === true) {
    info(`已复制 ${string}`, ms)
  } else if (typeof message === 'string') {
    info(message, ms)
  }

  feedback()
  log('copy', string)
}

/** ScrollView 中滑动到 View 的位置 */
export function scrollToView(viewRef: any, scrollViewRef: any, callback?: Fn) {
  if (!viewRef || !scrollViewRef) return false

  if (IOS || WEB) {
    viewRef.measure((_x: number, y: number) => {
      scrollViewRef.scrollTo({
        y,
        animated: true
      })

      if (typeof callback === 'function') {
        setTimeout(() => {
          callback()
        }, 240)
      }
    })
  } else {
    viewRef.measureLayout(findNodeHandle(scrollViewRef), (_x: number, y: number) => {
      scrollViewRef.scrollTo({
        y,
        animated: true
      })

      if (typeof callback === 'function') {
        setTimeout(() => {
          callback()
        }, 240)
      }
    })
  }

  return true
}
