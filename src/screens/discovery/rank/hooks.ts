/*
 * @Author: czy0729
 * @Date: 2024-11-16 09:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:38:32
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 排行榜页面逻辑 */
export function useRankPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

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

  return context
}
