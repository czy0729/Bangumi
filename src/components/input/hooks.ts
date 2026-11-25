/*
 * @Author: czy0729
 * @Date: 2026-11-24 14:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 14:20:00
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Keyboard } from 'react-native'
import { _ } from '@stores'

import type { EmitterSubscription } from 'react-native'
import type { BlurEvent, FocusEvent, TextInputChangeEvent, TextInputInstance } from '@types'
import type { Props } from './types'

/** 文本状态与清空行为 */
export function useInputValue({
  value,
  defaultValue,
  onChange,
  onChangeText
}: Pick<Props, 'value' | 'defaultValue' | 'onChange' | 'onChangeText'>) {
  const [innerValue, setInnerValue] = useState(value ?? defaultValue ?? '')
  const [prevValue, setPrevValue] = useState(value)

  // 外部值变化时同步内部镜像 (非受控时用于判断清空图标)
  if (value !== prevValue) {
    setPrevValue(value)
    setInnerValue(value ?? defaultValue ?? '')
  }

  const handleChange = useCallback(
    (evt: TextInputChangeEvent) => {
      setInnerValue(evt.nativeEvent.text)
      onChange?.(evt)
    },
    [onChange]
  )

  const handleClear = useCallback(() => {
    // 受控时以调用方回写的 value 为准; 非受控由组件先 native clear, 这里同步内部镜像
    setInnerValue('')

    // 清空是内部行为, 只构造 text 字段
    onChange?.({
      nativeEvent: {
        text: '',
        eventCount: 0,
        target: 0
      }
    } as TextInputChangeEvent)
    onChangeText?.('')
  }, [onChange, onChangeText])

  return {
    /** 内部文本: 非受控时作为展示值, 同时用于判断清空图标是否显示 */
    text: innerValue,
    handleChange,
    handleClear
  }
}

/** 输入框实例、聚焦状态与键盘遮挡测量 */
export function useInputRef({
  autoFocus,
  onFocus,
  onBlur: onBlurProp,
  onScrollIntoViewIfNeeded
}: Pick<Props, 'autoFocus' | 'onFocus' | 'onBlur' | 'onScrollIntoViewIfNeeded'>) {
  const inputRef = useRef<TextInputInstance | null>(null)
  const keyboardHeightRef = useRef(0)
  const [focused, setFocused] = useState(false)

  /** 用 ref 持有最新回调, 键盘监听只在挂载时注册 */
  const optionsRef = useRef({ onFocus, onBlur: onBlurProp, onScrollIntoViewIfNeeded })

  // 提交后再同步, 避免并发渲染下写入未提交的 props
  useEffect(() => {
    optionsRef.current = { onFocus, onBlur: onBlurProp, onScrollIntoViewIfNeeded }
  })

  const handleRef = useCallback((ref: TextInputInstance | null) => {
    inputRef.current = ref
  }, [])

  const onTouch = useCallback(() => {
    try {
      if (typeof inputRef.current?.focus === 'function') {
        inputRef.current.focus()
      }

      setTimeout(() => {
        if (typeof inputRef.current?.focus === 'function') {
          inputRef.current.focus()
        }
      }, 0)
    } catch {}
  }, [])

  const blur = useCallback(() => {
    try {
      if (typeof inputRef.current?.blur === 'function') {
        inputRef.current.blur()
      }

      setTimeout(() => {
        if (typeof inputRef.current?.blur === 'function') {
          inputRef.current.blur()
        }
      }, 0)
    } catch {}
  }, [])

  const handleBlur = useCallback((evt: BlurEvent) => {
    setFocused(false)

    const { onBlur } = optionsRef.current
    if (typeof onBlur === 'function') onBlur(evt)
  }, [])

  const handleFocus = useCallback((evt: FocusEvent) => {
    setFocused(true)

    const { onFocus, onScrollIntoViewIfNeeded } = optionsRef.current
    if (typeof onFocus === 'function') onFocus(evt)
    if (typeof onScrollIntoViewIfNeeded !== 'function') return

    /** 事件里的 target 在 RN 0.88 是 node handle, 改用自身 ref 测量 */
    const node = inputRef.current
    setTimeout(() => {
      try {
        node?.measureInWindow((_x: number, y: number, _width: number, height: number) => {
          const inputBottomPosition = y + height
          const scrollViewHeight = _.window.height
          if (inputBottomPosition > scrollViewHeight - keyboardHeightRef.current) {
            onScrollIntoViewIfNeeded?.(
              inputBottomPosition - scrollViewHeight + keyboardHeightRef.current + _.md
            )
          }
        })
      } catch {}
    }, 640)
  }, [])

  useEffect(() => {
    const autoFocusTimer = autoFocus
      ? setTimeout(() => {
          onTouch()
        }, 120)
      : undefined

    let listeners: EmitterSubscription[] = []
    if (typeof onScrollIntoViewIfNeeded === 'function') {
      listeners = [
        Keyboard.addListener('keyboardDidShow', evt => {
          keyboardHeightRef.current = evt.endCoordinates.height || 0
        }),
        Keyboard.addListener('keyboardDidHide', () => {
          keyboardHeightRef.current = 0
        })
      ]
    }

    return () => {
      clearTimeout(autoFocusTimer)
      try {
        listeners.forEach(listener => listener.remove())
      } catch {}
    }

    // 与原 componentDidMount 一致: 只在挂载时处理
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    inputRef,
    focused,
    handleRef,
    onTouch,
    blur,
    handleFocus,
    handleBlur
  }
}
