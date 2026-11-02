/*
 * @Author: czy0729
 * @Date: 2024-11-18 06:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 20:34:29
 *
 * 自定义源头页面逻辑: 初始化、滚动位置与输入框回滚定位
 */
import { useCallback, useRef } from 'react'
import { _, useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { ScrollTo } from '@components'
import type { NavigationProps, ScrollEvent } from '@types'
import type { Ctx } from './types'

/** 自定义源头页面逻辑 */
export function useOriginSettingPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const scrollToRef = useRef<ScrollTo>(null)
  const scrollYRef = useRef(0)

  const handleForwardRef = useCallback((scrollTo: ScrollTo) => {
    scrollToRef.current = scrollTo
  }, [])

  const handleOnScroll = useCallback((evt: ScrollEvent) => {
    scrollYRef.current = evt?.nativeEvent?.contentOffset?.y || 0
  }, [])

  /** 输入框上报的是还需要往上滚多少, 这里换算成绝对位置 */
  const handleScrollIntoViewIfNeeded = useCallback((deltaY: number) => {
    if (typeof scrollToRef.current === 'function') {
      const targetY = Math.max(0, scrollYRef.current + deltaY)

      scrollToRef.current({
        x: 0,
        y: targetY + _.md,
        animated: true
      })
    }
  }, [])

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      }
    },
    id
  )

  return {
    ...context,

    /** 供 ScrollView 绑定的 forwardRef */
    handleForwardRef,

    /** 供 ScrollView 绑定的 onScroll */
    handleOnScroll,

    /** 把输入框上报的相对滚动量转换成绝对位置滚动 */
    handleScrollIntoViewIfNeeded
  }
}
