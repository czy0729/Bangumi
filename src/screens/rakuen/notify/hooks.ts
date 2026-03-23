/*
 * @Author: czy0729
 * @Date: 2024-01-18 07:26:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-19 19:23:32
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 电波提醒页面逻辑 */
export function useNotifyPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      async onEnterComplete() {
        await $.init()

        $.doClearNotify()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return context
}
