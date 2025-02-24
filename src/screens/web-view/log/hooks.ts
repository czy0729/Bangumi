/*
 * @Author: czy0729
 * @Date: 2025-02-18 05:18:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-23 14:57:39
 */
import { useInitStore } from '@stores'
import { feedback } from '@utils'
import { useMount, useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

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
