/*
 * @Author: czy0729
 * @Date: 2024-01-18 07:00:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 12:30:33
 */
import { useInitStore } from '@stores'
import { useKeyboardAdjustResize, usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 吐槽页面逻辑 */
export function useSayPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )
  useKeyboardAdjustResize()

  return context
}
