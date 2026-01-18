/*
 * @Author: czy0729
 * @Date: 2024-11-18 06:40:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 18:59:03
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 好友页面逻辑 */
export function useFriendsPage(props: NavigationProps) {
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
