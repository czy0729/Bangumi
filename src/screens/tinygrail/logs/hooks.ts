/*
 * @Author: czy0729
 * @Date: 2024-03-10 17:11:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-06 14:54:14
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 资金日志页面逻辑 */
export function useTinygrailLogsPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
