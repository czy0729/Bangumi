/*
 * @Author: czy0729
 * @Date: 2024-11-17 11:21:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-12 22:46:36
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 标签条目页面逻辑 */
export function useTagPage(props: NavigationProps) {
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
