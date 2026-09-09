/*
 * @Author: czy0729
 * @Date: 2026-09-09 06:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 00:15:51
 *
 * fixed-textarea 专属 hooks: 持久化偏好 (useStorageSync) / 输入值与光标 (useTextareaValue) /
 * 面板与键盘焦点 (usePanelController) / 回复历史 (useReplyHistory) / 键盘占位 (useKeyboard)
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { feedback, getStorage, setStorage } from '@utils'
import { IOS } from '@constants'
import { BBCODE_CONFIG, insertBBCode } from './bbcode'
import {
  getBgmLabel,
  getKeyboardSpaceHeight,
  insertTextAt,
  upsertHistory,
  upsertReplyHistory
} from './utils'
import { BGM_EMOJIS_GROUP_DATA, MAX_BGM_HISTORY_COUNT, MAX_HISTORY_COUNT, NAMESPACE } from './ds'

import type { TextInputSelectionChangeEvent } from 'react-native'
import type {
  UseKeyboardReturn,
  UsePanelControllerOptions,
  UsePanelControllerReturn,
  UseReplyHistoryReturn,
  UseStorageSyncReturn,
  UseTextareaValueOptions,
  UseTextareaValueReturn
} from './types'

/** 持久化偏好: 宣传文案开关与表情分组 */
export function useStorageSync(): UseStorageSyncReturn {
  const [showSource, setShowSource] = useState(false)
  const [showSourceText, setShowSourceText] = useState(true)
  const [emojisGroupSelectedIndex, setEmojisGroupSelectedIndex] = useState(0)

  /** 最新值镜像, 避免在 setState updater 内做持久化副作用 */
  const showSourceRef = useRef(showSource)
  const showSourceTextRef = useRef(showSourceText)
  const emojisGroupSelectedIndexRef = useRef(emojisGroupSelectedIndex)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [source, sourceText, groupIndex] = await Promise.all([
          getStorage<boolean>(`${NAMESPACE}|showSource`),
          getStorage<boolean>(`${NAMESPACE}|showSourceText`),
          getStorage<number>(`${NAMESPACE}|emojisGroupSelectedIndex`)
        ])

        showSourceRef.current = typeof source === 'boolean' ? source : false
        showSourceTextRef.current = typeof sourceText === 'boolean' ? sourceText : true
        emojisGroupSelectedIndexRef.current = groupIndex || 0

        if (!mounted) return
        setShowSource(showSourceRef.current)
        setShowSourceText(showSourceTextRef.current)
        setEmojisGroupSelectedIndex(emojisGroupSelectedIndexRef.current)
      } catch {}
    })()

    return () => {
      mounted = false
    }
  }, [])

  const onToggleSource = useCallback(() => {
    const value = !showSourceRef.current
    showSourceRef.current = value
    setShowSource(value)
    setStorage(`${NAMESPACE}|showSource`, value)
  }, [])

  const onToggleSourceText = useCallback(() => {
    const value = !showSourceTextRef.current
    showSourceTextRef.current = value
    setShowSourceText(value)
    setStorage(`${NAMESPACE}|showSourceText`, value)
  }, [])

  const onEmojisGroupChange = useCallback((label: string) => {
    let index = BGM_EMOJIS_GROUP_DATA.findIndex(item => item === label)
    if (index === -1) index = 0

    emojisGroupSelectedIndexRef.current = index
    setEmojisGroupSelectedIndex(index)
    setStorage(`${NAMESPACE}|emojisGroupSelectedIndex`, index)
  }, [])

  return {
    /** 是否显示右下角宣传文案 */
    showSource,

    /** 是否显示左下角宣传文案实际内容 */
    showSourceText,

    /** 表情分组选中索引 */
    emojisGroupSelectedIndex,

    /** 显示 / 隐藏右下角宣传文案 */
    onToggleSource,

    /** 显示 / 隐藏左下角宣传文案实际内容 */
    onToggleSourceText,

    /** 选择表情组 */
    onEmojisGroupChange
  }
}

/** 输入值与光标: 外部 value 同步 / 文字与光标回调 / BBCode 与表情插入 */
export function useTextareaValue({
  value: externalValue,
  cursorEnd,
  onChange,
  valueRef,
  textAreaRef,
  focusInput,
  onSelectRecentBgm
}: UseTextareaValueOptions): UseTextareaValueReturn {
  const [value, setValue] = useState(externalValue ?? '')
  const [selection, setSelectionState] = useState({
    start: (externalValue ?? '').length,
    end: (externalValue ?? '').length
  })

  /** 最新光标镜像, 供插入类回调读取 */
  const selectionRef = useRef(selection)
  /** 上次外部 value, 判定外部是否插入文本 */
  const prevExternalValueRef = useRef(externalValue)
  /** 外部 cursorEnd 变化触发器 */
  const prevCursorEndRef = useRef(cursorEnd)

  useEffect(() => {
    valueRef.current = value
  }, [value, valueRef])

  useEffect(() => {
    selectionRef.current = selection
  }, [selection])

  /**
   * 外部插入文本后同步: 外部 value 变化时更新文本;
   * cursorEnd 变化时光标移到末尾
   */
  useEffect(() => {
    const changed = prevExternalValueRef.current !== externalValue
    const moveToCursorEnd = prevCursorEndRef.current !== cursorEnd
    prevExternalValueRef.current = externalValue
    prevCursorEndRef.current = cursorEnd

    if (!changed) return

    if (moveToCursorEnd) {
      const end = { start: externalValue.length, end: externalValue.length }
      valueRef.current = externalValue
      selectionRef.current = end
      setValue(externalValue)
      setSelectionState(end)
    } else {
      valueRef.current = externalValue
      setValue(externalValue)
    }
  }, [externalValue, cursorEnd, valueRef])

  /** 设定光标位置 (同步 state 与原生) */
  const setSelection = useCallback(
    (start: number) => {
      const next = { start, end: start }
      selectionRef.current = next
      setSelectionState(next)

      requestAnimationFrame(() => {
        try {
          textAreaRef.current?.setNativeProps?.({
            selection: next
          })
        } catch {}
      })
    },
    [textAreaRef]
  )

  const handleChange = useCallback(
    (nextValue: string) => {
      onChange?.(nextValue)

      // 安卓设置过光标后, 继续打字光标会闪回到上次设置的地方, 需要重置
      try {
        if (!IOS)
          textAreaRef.current?.setNativeProps?.({
            selection: {}
          })
      } catch {}

      valueRef.current = nextValue
      setValue(nextValue)
    },
    [onChange, textAreaRef, valueRef]
  )

  const handleSelectionChange = useCallback((event: TextInputSelectionChangeEvent) => {
    const next = event.nativeEvent.selection
    selectionRef.current = next
    setSelectionState(next)
  }, [])

  /** 模拟 BBCode / 纯文本 / 表情占位符插入 */
  const addSymbolText = useCallback(
    (symbol: string, isText: boolean = false) => {
      focusInput()

      // 纯文本
      if (isText) {
        const result = insertTextAt(valueRef.current, selectionRef.current, symbol)
        valueRef.current = result.value
        setValue(result.value)
        setSelection(result.cursor)
        return
      }

      // BBCode
      const config = BBCODE_CONFIG[symbol]
      if (!config) return

      const result = insertBBCode(valueRef.current, selectionRef.current, config.insert)
      valueRef.current = result.value
      setValue(result.value)
      setSelection(result.cursor)
    },
    [focusInput, setSelection, valueRef]
  )

  /** 选择 bgm 表情, 在光标处插入占位符 */
  const selectBgm = useCallback(
    (key: string | number, updateRecent: boolean = true) => {
      const id = Number(key)
      const index = selectionRef.current.end
      const label = getBgmLabel(id)

      const left = `${valueRef.current.slice(0, index)}${label}`
      const right = valueRef.current.slice(index)
      const nextValue = `${left}${right}`

      valueRef.current = nextValue
      setValue(nextValue)
      setSelection(left.length)

      if (updateRecent) onSelectRecentBgm?.(id)
    },
    [onSelectRecentBgm, setSelection, valueRef]
  )

  /** 清空文本并复位光标 */
  const resetValue = useCallback(() => {
    valueRef.current = ''
    setValue('')
    setSelection(0)
  }, [setSelection, valueRef])

  return {
    /** 输入框文本 */
    value,

    /** 光标位置 */
    selection,

    /** 文字改变回调 */
    handleChange,

    /** 光标改变回调 */
    handleSelectionChange,

    /** 插入符号 / BBCode / 表情文本 */
    addSymbolText,

    /** 选择 bgm 表情 */
    selectBgm,

    /** 设定光标位置 */
    setSelection,

    /** 清空文本并复位光标 */
    resetValue
  }
}

/** 面板与键盘焦点: 输入框 / bgm 面板 / 回复历史显隐与输入框聚焦失焦 */
export function usePanelController({
  textAreaRef,
  simple,
  onClose,
  saveDraft
}: UsePanelControllerOptions): UsePanelControllerReturn {
  const [showTextarea, setShowTextarea] = useState(false)
  const [showBgm, setShowBgm] = useState(false)
  const [showReplyHistory, setShowReplyHistory] = useState(false)

  /** 输入框聚焦状态 */
  const focusedRef = useRef(false)
  /** 遗留定时器, 卸载时统一清理避免泄漏 */
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const addTimer = useCallback((fn: () => void, delay: number = 0) => {
    const id = setTimeout(() => {
      timersRef.current = timersRef.current.filter(item => item !== id)
      fn()
    }, delay)
    timersRef.current.push(id)
  }, [])

  useEffect(() => {
    // 读取 current 而非挂载时的数组引用, addTimer 过滤后会生成新数组
    return () => {
      timersRef.current.forEach(clearTimeout)
      timersRef.current = []
    }
  }, [])

  const blurInput = useCallback(() => {
    try {
      if (typeof textAreaRef.current?.blur === 'function' && focusedRef.current) {
        textAreaRef.current.blur()
        focusedRef.current = false
      }
    } catch {}
  }, [textAreaRef])

  const focusInput = useCallback(() => {
    if (focusedRef.current) return

    try {
      if (typeof textAreaRef.current?.focus === 'function') {
        textAreaRef.current.focus()
        focusedRef.current = true
      }
    } catch {}
  }, [textAreaRef])

  const handleBlur = useCallback(() => {
    if (!simple) saveDraft()

    onClose()
    setShowTextarea(false)
    setShowBgm(false)
    setShowReplyHistory(false)
    addTimer(blurInput)
  }, [simple, saveDraft, onClose, addTimer, blurInput])

  const handleFocus = useCallback(() => {
    setShowTextarea(true)
    setShowBgm(false)
    setShowReplyHistory(false)

    // 延迟是为了等待键盘动画结束
    addTimer(focusInput, 640)
  }, [addTimer, focusInput])

  const handleShowBgm = useCallback(() => {
    // 安卓 eject 后, 键盘表现跟 IOS 不一致, 特殊处理
    if (IOS) {
      setShowBgm(true)
      setShowReplyHistory(false)
      addTimer(blurInput)
      return
    }

    addTimer(() => {
      blurInput()

      addTimer(() => {
        setShowBgm(true)
        setShowReplyHistory(false)
      })
    })
  }, [addTimer, blurInput])

  const handleHideBgm = useCallback(() => {
    setShowBgm(false)
    addTimer(focusInput)
  }, [addTimer, focusInput])

  const handleShowReplyHistory = useCallback(() => {
    // 安卓 eject 后, 键盘表现跟 IOS 不一致, 特殊处理
    if (IOS) {
      setShowReplyHistory(true)
      setShowBgm(true)
      addTimer(blurInput)
      return
    }

    addTimer(() => {
      blurInput()

      addTimer(() => {
        setShowReplyHistory(true)
        setShowBgm(true)
      })
    })
  }, [addTimer, blurInput])

  const handleHideReplyHistory = useCallback(() => {
    setShowReplyHistory(false)
    addTimer(focusInput)
  }, [addTimer, focusInput])

  const collapse = useCallback(() => {
    setShowTextarea(false)
  }, [])

  return {
    /** 是否显示输入框 */
    showTextarea,

    /** 是否显示 bgm 面板 */
    showBgm,

    /** 是否显示回复历史 */
    showReplyHistory,

    /** 是否编辑态 (输入框或任一面板展开) */
    editing: showTextarea || showBgm,

    /** 获取焦点回调 */
    handleFocus,

    /** 失去焦点回调 */
    handleBlur,

    /** 显示 bgm 表情选择块 */
    handleShowBgm,

    /** 隐藏 bgm 表情选择块 */
    handleHideBgm,

    /** 显示最近回复历史框 */
    handleShowReplyHistory,

    /** 收起最近回复历史框 */
    handleHideReplyHistory,

    /** 仅收起输入框 (不清空文本) */
    collapse,

    /** 聚焦输入框 */
    focusInput
  }
}

/** 回复历史: 最近 bgm 表情 / 回复历史 / 锁定历史, 增删与持久化 */
export function useReplyHistory(): UseReplyHistoryReturn {
  const [history, setHistory] = useState<number[]>([])
  const [replyHistory, setReplyHistory] = useState<string[]>([])
  const [lockHistory, setLockHistory] = useState('')

  const historyRef = useRef(history)
  const replyHistoryRef = useRef(replyHistory)
  const lockHistoryRef = useRef(lockHistory)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [bgmHistory, replies, lock] = await Promise.all([
          getStorage<string>(NAMESPACE),
          getStorage<string[]>(`${NAMESPACE}|replyHistory`),
          getStorage<string>(`${NAMESPACE}|lockHistory`)
        ])

        historyRef.current = (bgmHistory || '38').split(',').filter(Boolean).map(Number)
        replyHistoryRef.current = replies || []
        lockHistoryRef.current = lock || ''

        if (!mounted) return
        setHistory(historyRef.current)
        setReplyHistory(replyHistoryRef.current)
        setLockHistory(lockHistoryRef.current)
      } catch {}
    })()

    return () => {
      mounted = false
    }
  }, [])

  const setRecentUseBgm = useCallback((id: number) => {
    const next = upsertHistory(historyRef.current, id, MAX_BGM_HISTORY_COUNT)
    historyRef.current = next
    setHistory(next)
    setStorage(NAMESPACE, next.join())
  }, [])

  const saveReplyHistory = useCallback((value: string) => {
    const next = upsertReplyHistory(
      replyHistoryRef.current,
      value,
      lockHistoryRef.current,
      MAX_HISTORY_COUNT
    )
    replyHistoryRef.current = next
    setReplyHistory(next)
    setStorage(`${NAMESPACE}|replyHistory`, next)
  }, [])

  const onLockHistory = useCallback((text: string) => {
    if (!text) return false

    const value = lockHistoryRef.current === text ? '' : text
    lockHistoryRef.current = value
    setLockHistory(value)
    feedback(true)
    setStorage(`${NAMESPACE}|lockHistory`, value)
    return true
  }, [])

  return {
    /** 最近使用 bgm 表情 id 列表 */
    history,

    /** 回复历史列表 */
    replyHistory,

    /** 置顶的回复历史文本 */
    lockHistory,

    /** 记录最近使用的 bgm 表情 */
    setRecentUseBgm,

    /** 保存回复历史 */
    saveReplyHistory,

    /** 切换锁定某个最近的回复 */
    onLockHistory
  }
}

/** 键盘占位: 键盘高度归一与占位控件显隐 */
export function useKeyboard(): UseKeyboardReturn {
  const [showKeyboardSpacer, setShowKeyboardSpacer] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  const onToggleKeyboard = useCallback((isOpen: boolean, height: number) => {
    if (!isOpen) return

    setShowKeyboardSpacer(true)
    setKeyboardHeight(getKeyboardSpaceHeight(height, IOS))
  }, [])

  /** 收起输入框时复位, 否则下次展开键盘不再走出现动画 */
  const resetKeyboardSpacer = useCallback(() => {
    setShowKeyboardSpacer(false)
  }, [])

  return {
    /** 键盘占位控件是否显示 */
    showKeyboardSpacer,

    /** 键盘高度 */
    keyboardHeight,

    /** 键盘展开回调 */
    onToggleKeyboard,

    /** 复位键盘占位控件显示状态 */
    resetKeyboardSpacer
  }
}
