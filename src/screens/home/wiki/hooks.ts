/*
 * @Author: czy0729
 * @Date: 2024-11-17 11:39:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-28 09:00:00
 *
 * 修订历史页面逻辑
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 修订历史页面逻辑 */
export function useSubjectWikiPage(props: NavigationProps) {
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
