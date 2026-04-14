/*
 * @Author: czy0729
 * @Date: 2024-03-22 08:05:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 09:49:11
 */
import { uiStore, useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 猜你喜欢页面逻辑 */
export function useLikePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      },
      onBlur() {
        uiStore.closePopableSubject()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return context
}
