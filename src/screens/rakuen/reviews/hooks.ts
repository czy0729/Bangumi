/*
 * @Author: czy0729
 * @Date: 2024-11-18 02:04:42
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 影评 (同条目中的评论) 页面逻辑 */
export function useReviewsPage(props: NavigationProps) {
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
