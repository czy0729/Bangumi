/*
 * @Author: czy0729
 * @Date: 2024-11-19 06:29:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:31:56
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 买入推荐页面逻辑 */
export function useTinygrailAdvanceAskPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      }
    },
    id
  )

  return context
}
