/*
 * @Author: czy0729
 * @Date: 2026-11-13 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 14:00:00
 *
 * 预设面板开合与输入框焦点
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { uiStore } from '@stores'

import type { InputInstance } from '@components'

/** 弹窗展开后聚焦输入框 */
const FOCUS_DELAY = 240

/** 预设面板收起后聚焦输入框 */
const REFOCUS_DELAY = 480

export function useLinkModal(visible: boolean) {
  const [show, setShow] = useState(false)
  const inputRef = useRef<InputInstance>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const focus = useCallback((delay: number) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      try {
        const ipt = inputRef.current?.inputRef
        if (typeof ipt?.focus === 'function') ipt.focus()
      } catch {}
    }, delay)
  }, [])

  const blur = useCallback(() => {
    clearTimeout(timer.current)
    try {
      const ipt = inputRef.current?.inputRef
      if (typeof ipt?.blur === 'function') ipt.blur()
    } catch {}
  }, [])

  const handleOpen = useCallback(() => {
    setShow(true)
    blur()
  }, [blur])

  const handleClose = useCallback(() => {
    setShow(false)
    focus(REFOCUS_DELAY)
  }, [focus])

  const handleSelect = useCallback(
    (link: string) => {
      uiStore.setLinkModalText(link)
      handleClose()
    },
    [handleClose]
  )

  useEffect(() => {
    if (visible) focus(FOCUS_DELAY)
  }, [focus, visible])

  useEffect(() => () => clearTimeout(timer.current), [])

  return {
    show,
    inputRef,
    handleOpen,
    handleClose,
    handleSelect
  }
}
