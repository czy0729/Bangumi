/*
 * @Author: czy0729
 * @Date: 2024-11-17 11:21:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 11:37:02
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 人物的角色页面逻辑 */
export function useVoicesPage(props: NavigationProps) {
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
