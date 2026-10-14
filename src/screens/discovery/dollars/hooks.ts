/*
 * @Author: czy0729
 * @Date: 2024-04-06 12:30:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-05 14:43:00
 *
 * Dollars 页面逻辑: 初始化 / 生命周期 / 定时刷新
 */
import { useEffect } from 'react'
import { useInitStore } from '@stores'
import { useActive, useMount, usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** Dollars 页面逻辑 */
export function useDollarsPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  const active = useActive()

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

  useEffect(() => {
    if (!active) return

    const interval = setInterval(() => {
      $.updateDollars()
    }, 4000)

    return () => {
      clearInterval(interval)
    }
  }, [$, active])

  useMount(() => {
    return () => {
      $.listRef = null
      $.inputRef = null
    }
  })

  return context
}
