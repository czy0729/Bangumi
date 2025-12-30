/*
 * @Author: czy0729
 * @Date: 2024-11-17 06:33:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-30 18:04:30
 */
import { useCallback, useRef } from 'react'
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { InputInstance } from '@components'
import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 搜索页面逻辑 */
export function useSearchPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const iptRef = useRef<InputInstance>(null)
  const handleFocus = useCallback(() => {
    try {
      if (typeof iptRef.current?.inputRef?.focus === 'function') {
        iptRef.current.inputRef.focus()
      }
    } catch (error) {}
  }, [])

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return {
    ...context,
    iptRef,
    handleFocus
  }
}
