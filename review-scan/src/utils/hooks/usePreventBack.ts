/*
 * @Author: czy0729
 * @Date: 2025-08-08 22:15:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-08 22:16:32
 */
import { useEffect, useRef } from 'react'
import { BackHandler, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { confirm } from '@utils'
import { Fn } from '@types'

/**
 * 防止误触退出页面的自定义 Hook
 * @param {object} options - 配置选项
 * @param {boolean} [options.enabled=true] - 是否启用防止误触
 * @param {Function} [options.onBack] - 自定义返回处理函数
 * @param {string} [options.message] - Android 返回键提示信息（仅 Android 有效）
 */
const usePreventBack = ({
  enabled = true,
  onBack,
  message = '确定要返回吗，当前操作可能不会保存？'
}: {
  enabled?: boolean
  onBack?: Fn
  message?: string
} = {}) => {
  const navigation = useNavigation()
  const isEnabledRef = useRef(enabled)

  useEffect(() => {
    isEnabledRef.current = enabled
  }, [enabled])

  // 处理 Android 返回键
  useEffect(() => {
    if (Platform.OS !== 'android' || !enabled) return

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (typeof onBack === 'function') {
        onBack()
        return true
      }

      // 默认行为：显示确认对话框
      confirm(message, () => navigation.goBack())

      return true
    })

    return () => backHandler.remove()
  }, [enabled, onBack, message, navigation])

  // 处理 iOS 滑动返回手势
  useEffect(() => {
    if (Platform.OS !== 'ios' || !enabled) return

    // 禁用滑动返回手势
    navigation.setOptions({
      gestureEnabled: false
    })

    // 组件卸载时恢复默认设置
    return () => {
      if (navigation.isFocused()) {
        navigation.setOptions({
          gestureEnabled: true
        })
      }
    }
  }, [enabled, navigation])
}

export default usePreventBack
