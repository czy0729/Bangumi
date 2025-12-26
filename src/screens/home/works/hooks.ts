/*
 * @Author: czy0729
 * @Date: 2024-11-17 11:21:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:59:43
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 人物的作品页面逻辑 */
export function useWorksPage(props: NavigationProps) {
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
