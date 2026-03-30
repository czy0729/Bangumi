/*
 * @Author: czy0729
 * @Date: 2023-04-08 05:02:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:45:46
 */
import { useDebugValue, useEffect, useState } from 'react'
import { WEB } from '@constants/device'
import { logger } from '../dev'
import useNavigation from './useNavigation'

/**
 * 安全版 useIsFocusedApp
 * 防止在非导航环境（如全局弹窗、独立组件）下调用 navigation 方法导致崩溃
 */
export default function useIsFocusedApp(): boolean {
  // 1. 尝试获取 navigation 对象
  // 如果 useNavigation() 内部会 throw，建议在 useNavigation 源码也做一层 null 保护
  const navigation = useNavigation()

  // 2. 环境判定：是否具备合法的导航监听能力
  // 检查 navigation 是否存在，且是否具备 addListener 方法（防止在非页面组件中崩溃）
  const hasNav = !!(navigation && typeof navigation.addListener === 'function')

  // 3. 初始状态获取
  // 使用初始化函数（Lazy Initial State）来安全地获取初始值
  const [isFocused, setIsFocused] = useState(() => {
    if (WEB || !hasNav) return true
    try {
      return typeof navigation.isFocused === 'function' ? navigation.isFocused() : true
    } catch (e) {
      return true
    }
  })

  // 4. 计算当前应该返回的值
  let valueToReturn = true
  if (!WEB && hasNav) {
    try {
      // 这里的 navigation.isFocused 可能是方法也可能是属性，根据你的库版本适配
      valueToReturn =
        typeof navigation.isFocused === 'function' ? navigation.isFocused() : !!navigation.isFocused
    } catch (e) {
      valueToReturn = true // 降级方案
    }
  }

  // 5. 同步状态（防止渲染期间状态变更导致的 UI 不同步）
  if (isFocused !== valueToReturn) {
    setIsFocused(valueToReturn)
  }

  // 6. 安全地绑定事件
  useEffect(() => {
    // 如果没有导航环境，直接静默退出，不执行任何监听
    if (!hasNav) return

    let unsubscribeFocus: () => void
    let unsubscribeBlur: () => void

    try {
      unsubscribeFocus = navigation.addListener('focus', () => setIsFocused(true))
      unsubscribeBlur = navigation.addListener('blur', () => setIsFocused(false))
    } catch (e) {
      logger.warn('useIsFocusedApp', 'Failed to attach navigation listeners', e)
    }

    return () => {
      // 使用可选链安全执行清理
      if (typeof unsubscribeFocus === 'function') unsubscribeFocus()
      if (typeof unsubscribeBlur === 'function') unsubscribeBlur()
    }
  }, [navigation, hasNav])

  useDebugValue(valueToReturn)

  return valueToReturn
}
