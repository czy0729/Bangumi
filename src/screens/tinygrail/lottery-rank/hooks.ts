/*
 * @Author: czy0729
 * @Date: 2025-07-17 13:09:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-07 09:07:13
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 刮刮乐日榜页面逻辑 */
export function useTinygrailLotteryRankPage(props: NavigationProps) {
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
