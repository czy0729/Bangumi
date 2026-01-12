/*
 * @Author: czy0729
 * @Date: 2025-06-09 14:59:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-09 15:09:20
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 图集页面逻辑 */
export function usePicPage(props: NavigationProps) {
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
