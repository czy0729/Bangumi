/*
 * @Author: czy0729
 * @Date: 2025-12-10 22:43:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-10 22:44:14
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 条目关联页面逻辑 */
export function useSubjectLinkPage(props: NavigationProps) {
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
