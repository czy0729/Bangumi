/*
 * @Author: czy0729
 * @Date: 2024-03-10 17:11:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 13:31:50
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 资金日志页面逻辑 */
export function useTinygrailLogsPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
