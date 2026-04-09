/*
 * @Author: czy0729
 * @Date: 2024-03-02 04:55:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 15:40:26
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 热门榜单页面逻辑 */
export function useTinygrailOverviewPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
