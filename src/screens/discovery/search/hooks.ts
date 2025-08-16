/*
 * @Author: czy0729
 * @Date: 2024-11-17 06:33:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-17 05:53:23
 */
import { useCallback, useRef } from 'react'
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 搜索页面逻辑 */
export function useSearchPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const iptRef = useRef<any>(null)
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
