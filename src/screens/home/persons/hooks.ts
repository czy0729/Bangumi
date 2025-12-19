/*
 * @Author: czy0729
 * @Date: 2024-11-16 10:13:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 16:16:35
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 制作人员页面逻辑 */
export function usePersonsPage(props: NavigationProps) {
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
