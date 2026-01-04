/*
 * @Author: czy0729
 * @Date: 2024-11-17 09:32:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-02 20:56:59
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 全站日志页面逻辑 */
export function useDiscoveryBlogPage(props: NavigationProps) {
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
