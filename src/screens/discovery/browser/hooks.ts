/*
 * @Author: czy0729
 * @Date: 2024-11-17 06:56:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-17 06:56:11
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 索引页面逻辑 */
export function useBrowserPage(props: NavigationProps) {
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
