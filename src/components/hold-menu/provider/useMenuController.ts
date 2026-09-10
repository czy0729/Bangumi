/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:26:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 10:30:00
 */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import type { ScrollView } from 'react-native'
import { useAnimatedRef, useSharedValue } from 'react-native-reanimated'
import { getMenuPosition } from '../utils'

import type { MenuContextValue, MenuParamsContextValue } from '../context'
import type { MenuOpenParams, MenuPosition } from '../types'

/** 关闭动画结束后清除菜单内容的时间 (ms), 避免旧内容在下次展开时闪现 */
const CLOSE_CLEANUP_DELAY = 200

/**
 * 菜单打开/关闭控制器, 由 Provider 消费
 * 稳定引用与参数引用分离, 开合菜单只触发 Menu 重渲染
 */
export const useMenuController = (
  theme?: 'light' | 'extraLight' | 'dark',
  paddingBottom?: number
) => {
  const [params, setParams] = useState<MenuOpenParams | null>(null)
  const [show, setShow] = useState(false)
  const active = useSharedValue(0)
  const position = useSharedValue<MenuPosition | null>(null)
  const highlightIndex = useSharedValue(-1)
  const scrollOffset = useSharedValue(0)
  const scrollViewRef = useAnimatedRef<ScrollView>()
  // 菜单项坐标与内容高度由 MenuItems onLayout 实测写入
  const rowOffsets = useSharedValue<number[]>([])
  const contentHeight = useSharedValue(0)
  const safePaddingBottom = (paddingBottom || 0) + 24
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const open = useCallback((_params: MenuOpenParams) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    // 仅提交菜单内容并计算位置, 展开动画由 activate 单独激活
    setParams(_params)
  }, [])

  const activate = useCallback(() => {
    setShow(true)
    active.value = 1
  }, [active])

  const close = useCallback(() => {
    setShow(false)
    active.value = 0
    // 复位拖动选择状态, 避免下次展开残留高亮
    highlightIndex.value = -1
    scrollOffset.value = 0
    rowOffsets.value = []
    contentHeight.value = 0
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    // 菜单关闭动画结束后清除旧内容, 避免下次展开时闪现上一次的菜单项
    closeTimeoutRef.current = setTimeout(() => {
      closeTimeoutRef.current = null
      setParams(null)
    }, CLOSE_CLEANUP_DELAY)
  }, [active, highlightIndex, scrollOffset, rowOffsets, contentHeight])

  // Provider 卸载时清理关闭动画后的定时器, 避免卸载后 setParams 触发警告
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  // 内容提交完成后同步写入位置, 保证动画首帧已包含完整菜单项
  // (React 19 已从 react 包移除 flushSync, RN 无 react-dom, 故改用提交后回调)
  useLayoutEffect(() => {
    if (!params) return
    position.value = getMenuPosition(params, safePaddingBottom)
  }, [params, position, safePaddingBottom])

  // 拖动选择上下文, shared value 引用稳定, useMemo 仅为固定结构
  const highlightContextValue = useMemo(
    () => ({ highlightIndex, scrollOffset, scrollViewRef, rowOffsets, contentHeight }),
    [highlightIndex, scrollOffset, scrollViewRef, rowOffsets, contentHeight]
  )

  // 稳定上下文, 仅依赖稳定引用, 开合菜单不触发 HoldItem/Backdrop re-render
  const contextValue = useMemo<MenuContextValue>(
    () => ({
      active,
      position,
      theme: theme || 'light',
      paddingBottom: safePaddingBottom,
      open,
      activate,
      close,
      highlight: highlightContextValue
    }),
    [active, position, theme, safePaddingBottom, open, activate, close, highlightContextValue]
  )

  const paramsValue = useMemo<MenuParamsContextValue>(() => ({ params }), [params])

  return { contextValue, paramsValue, show }
}

export default useMenuController
