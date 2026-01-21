/*
 * @Author: czy0729
 * @Date: 2024-11-19 07:30:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-19 07:30:50
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 低价股页面逻辑 */
export function useTinygrailAdvanceStatePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
