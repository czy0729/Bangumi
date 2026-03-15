/*
 * @Author: czy0729
 * @Date: 2024-11-18 07:46:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 06:29:59
 */
import { useCallback, useRef } from 'react'
import { _, useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { ScrollTo } from '@components'
import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 个人设置页面逻辑 */
export function useUserSettingPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  /** ScrollTo 函数引用 */
  const scrollToRef = useRef<ScrollTo>(null)

  /** 当前 ScrollView 的滚动位置 */
  const scrollYRef = useRef(0)

  /** 供 ScrollView 绑定的 forwardRef */
  const handleForwardRef = useCallback((scrollTo: ScrollTo) => {
    scrollToRef.current = scrollTo
  }, [])

  /** 供 ScrollView 绑定的 onScroll */
  const handleOnScroll = useCallback(
    (evt: any) => {
      scrollYRef.current = evt?.nativeEvent?.contentOffset?.y || 0

      $.onScroll(evt)
    },
    [$]
  )

  /**
   * Input 传上来的值是「还需要往上滚多少」
   * 这里必须转换成「滚到哪个绝对位置」
   */
  const handleScrollIntoViewIfNeeded = useCallback((deltaY: number) => {
    if (typeof scrollToRef.current === 'function') {
      const currentY = scrollYRef.current
      const targetY = Math.max(0, currentY + deltaY)

      scrollToRef.current({
        x: 0,
        y: targetY + _.md,
        animated: true
      })
    }
  }, [])

  const handleRefresh = useCallback(async () => {
    if (typeof scrollToRef.current === 'function') {
      scrollToRef.current({
        x: 0,
        y: 0,
        animated: true
      })
    }
    $.onRefresh()
  }, [$])

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
    handleOnScroll,
    handleScrollIntoViewIfNeeded,
    handleRefresh
  }
}
