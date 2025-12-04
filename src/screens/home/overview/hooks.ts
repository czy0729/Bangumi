/*
 * @Author: czy0729
 * @Date: 2024-11-16 10:13:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-02 23:42:44
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 条目封面一览页面逻辑 */
export function useOverviewPage(props: NavigationProps) {
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
