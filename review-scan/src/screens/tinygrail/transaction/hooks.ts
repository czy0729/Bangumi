/*
 * @Author: czy0729
 * @Date: 2025-03-04 19:18:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-07 03:28:34
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 圣杯广场发布页面逻辑 */
export function useTinygrailTransactionPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
