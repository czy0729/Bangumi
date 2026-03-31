/*
 * @Author: czy0729
 * @Date: 2024-11-17 16:19:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:04:23
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 影评页面逻辑 */
export function useMinePage(props: NavigationProps) {
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
