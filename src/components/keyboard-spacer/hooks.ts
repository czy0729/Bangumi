/*
 * @Author: czy0729
 * @Date: 2026-11-24 10:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 12:20:00
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Keyboard } from 'react-native'
import { IOS } from '@constants'
import { configureLayoutAnimation, getKeyboardSpace } from './utils'

import type { KeyboardEvent } from 'react-native'
import type { UseKeyboardSpaceOptions } from './types'

/** 键盘占位高度, 键盘显示/隐藏提交后回调 */
export function useKeyboardSpace(options: UseKeyboardSpaceOptions) {
  /** 每次键盘事件都生成新对象, 保证重复弹出相同高度也会回调 */
  const [state, setState] = useState<{ visible: boolean; space: number } | null>(null)

  /** 用 ref 持有最新配置, 监听只在挂载时注册一次 */
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    const updateKeyboardSpace = (event: KeyboardEvent) => {
      if (!event.endCoordinates) return

      const { animate, topSpacing } = optionsRef.current
      if (animate) configureLayoutAnimation(event)

      setState({
        visible: true,
        space: getKeyboardSpace(event.endCoordinates, topSpacing)
      })
    }

    const resetKeyboardSpace = (event: KeyboardEvent) => {
      const { animate, onToggle } = optionsRef.current

      // 与原实现一致: 收回时先回调再配置动画
      onToggle?.(false, 0)

      if (animate) configureLayoutAnimation(event)

      setState({
        visible: false,
        space: 0
      })
    }

    const updateListener = IOS ? 'keyboardWillShow' : 'keyboardDidShow'
    const resetListener = IOS ? 'keyboardWillHide' : 'keyboardDidHide'
    const listeners = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace)
    ]

    return () => {
      try {
        listeners.forEach(listener => listener.remove())
      } catch {}
    }
  }, [])

  // 与原 setState 回调一致: 弹出时提交后同步回调, 挂载时不回调
  useLayoutEffect(() => {
    if (!state?.visible) return

    optionsRef.current.onToggle?.(true, state.space)
  }, [state])

  return state?.space ?? 0
}
