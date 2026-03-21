/*
 * @Author: czy0729
 * @Date: 2024-11-17 01:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 15:52:43
 */
import { useCallback, useRef } from 'react'
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { ListViewInstance, ScrollToOffset } from '@components'
import type { NavigationProps } from '@types'
import type { Ctx, HandleForwardRef } from './types'

/** 每日放送页面逻辑 */
export function useCalendarPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  /** ListView.ref */
  const scrollViewRef = useRef<ListViewInstance>(null)

  /** 收集长列表的 ref */
  const handleForwardRef = useCallback<HandleForwardRef>(ref => {
    scrollViewRef.current = ref
  }, [])

  /** 滚动到 */
  const handleScrollToOffset = useCallback<ScrollToOffset>(params => {
    if (typeof scrollViewRef.current?.scrollToOffset === 'function') {
      scrollViewRef.current.scrollToOffset(params)
    }
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
    handleForwardRef,
    handleScrollToOffset
  }
}
