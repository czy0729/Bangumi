/*
 * @Author: czy0729
 * @Date: 2024-11-16 11:09:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-05 00:04:46
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 找番剧页面逻辑 */
export function useNSFWPage(props: NavigationProps) {
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
