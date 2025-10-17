/*
 * @Author: czy0729
 * @Date: 2024-01-04 22:39:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 11:54:02
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 超展开页面逻辑 */
export function useRakuenPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $, navigation } = context

  usePageLifecycle(
    {
      onEnter() {
        $.init()

        navigation.addListener(`${EVENT_APP_TAB_PRESS}|Rakuen`, () => {
          $.onRefreshThenScrollTop()
        })
      }
    },
    id
  )

  return context
}
