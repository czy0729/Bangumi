/*
 * @Author: czy0729
 * @Date: 2019-05-07 19:45:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 07:30:47
 */
import { Alert, Clipboard, findNodeHandle, NativeModules, Vibration } from 'react-native'
import * as Haptics from 'expo-haptics'
import { Portal } from '@components/portal'
import { IOS } from '@constants/constants'
import { WEB } from '@constants/device'
import { FROZEN_FN } from '@constants/init'
import { syncS2T, syncSystemStore } from '../async'
import { log } from './utils'

import type { ActionSheetConfig, ActionSheetConfigOptions } from '@components/action-sheet'
import type { Fn, TimerRef } from '@types'

/**
 * Loading 指示器
 * @param text 内容
 * @param time 指示器持续多少秒, 默认 0s
 * @param delay 延迟多少毫秒后显示, 默认 1000ms
 * @returns fn 取消函数
 */
export function loading(text: string = 'Loading...', time: number = 0, delay: number = 1000) {
  let toastId: number
  let timerId: TimerRef = setTimeout(() => {
    timerId = null
    const { Toast } = require('@components/toast') as {
      Toast: { loading: (content: string, duration: number, onClose: () => void) => number }
    }
    toastId = Toast.loading(syncS2T(text), time, () => {
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
  onPress: () => void = FROZEN_FN,
  title: string = '警告',
  onCancelPress: () => void = FROZEN_FN,
  confirmText: string = '确定',
  cancelText: string = '取消'
) {
  const alertTitle = syncS2T(title)
  const alertContent = syncS2T(content)
  const alertParams = [
    {
      text: syncS2T(cancelText),
      style: 'cancel' as const,
      onPress: onCancelPress
    },
    {
      text: syncS2T(confirmText),
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
  const alertTitle = syncS2T(title)
  const alertContent = syncS2T(content)
  const alertParams = [
    {
      text: syncS2T('确定'),
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
  onClose: () => void = FROZEN_FN,
  mask: boolean = false
) {
  const { Toast } = require('@components/toast') as {
    Toast: { info: (content: string, duration: number, onClose: () => void, mask: boolean) => void }
  }
  Toast.info(syncS2T(String(content)), duration, onClose, mask)
}

/**
 * 显示 ActionSheet
 */
export function showActionSheet(
  options: string[] | readonly string[] = [],
  callback: Fn = FROZEN_FN,
  { title, message, cancelButtonIndex, destructiveButtonIndex }: ActionSheetConfigOptions = {}
) {
  const { ActionSheetStatic } = require('@components/action-sheet') as {
    ActionSheetStatic: {
      showActionSheetWithOptions: (config: ActionSheetConfig, callback: Fn) => void
    }
  }
  ActionSheetStatic.showActionSheetWithOptions(
    {
      title,
      message,
      options: [...options],
      cancelButtonIndex,
      destructiveButtonIndex
    },
    callback
  )
}

/** 显示 ImageViewer */
export function showImageViewer(
  imageUrls: readonly {
    url?: string
    _url?: string
    headers?: Record<string, string>
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

/** 安卓原生切换白天黑夜标志, 用于动态改变原生弹窗主题颜色 */
export function androidDayNightToggle(isDark?: boolean) {
  if (IOS || WEB) return

  const DayNight = NativeModules.DayNight as { setDarkMode: (mode: number) => void }
  DayNight.setDarkMode(isDark ? 2 : 1)
}

/** 复制到剪贴板 */
export function copy(val: string | number, message: boolean | string = true, ms?: number) {
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
export function scrollToView(
  viewRef: {
    measure: (
      callback: (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => void
    ) => void
    measureLayout: (
      relativeToNativeNode: unknown,
      onSuccess: (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => void
    ) => void
  },
  scrollViewRef: {
    scrollTo: (options: { y: number; animated: boolean }) => void
  },
  callback?: () => void
) {
  if (!viewRef || !scrollViewRef) return false

  const scrollTo = (y: number) => {
    scrollViewRef.scrollTo({
      y,
      animated: true
    })

    if (typeof callback === 'function') {
      setTimeout(() => {
        callback()
      }, 240)
    }
  }

  if (IOS || WEB) {
    viewRef.measure((_x, y) => {
      scrollTo(y)
    })
  } else {
    viewRef.measureLayout(
      findNodeHandle(scrollViewRef as unknown as React.Component) as number,
      (_x, y) => {
        scrollTo(y)
      }
    )
  }

  return true
}
