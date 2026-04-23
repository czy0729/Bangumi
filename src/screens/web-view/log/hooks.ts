/*
 * @Author: czy0729
 * @Date: 2025-02-18 05:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-22 17:34:44
 */
import { useInitStore } from '@stores'
import { feedback } from '@utils'
import { useMount, useRunAfter } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 错误上报分析页面逻辑 */
export function useLogPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  useMount(() => {
    const intervalId = setInterval(() => {
      if ($.state.detail) return

      $.getData()
      feedback(true)
    }, Number($.state.distance) || 120000)

    return () => {
      clearInterval(intervalId)
    }
  })

  return context
}
