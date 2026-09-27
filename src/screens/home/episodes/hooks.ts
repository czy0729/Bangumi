/*
 * @Author: czy0729
 * @Date: 2024-11-17 09:53:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 10:02:16
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 条目章节页面逻辑 */
export function useEpisodesPage(props: NavigationProps) {
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
