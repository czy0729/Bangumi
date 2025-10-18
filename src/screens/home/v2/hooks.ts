/*
 * @Author: czy0729
 * @Date: 2024-01-05 20:34:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 02:56:09
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 进度页面逻辑 */
export function useHomePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $, navigation } = context

  usePageLifecycle(
    {
      onEnter() {
        $.updateInitialPage(navigation)

        navigation.addListener(`${EVENT_APP_TAB_PRESS}|Home`, () => {
          $.onRefreshThenScrollTop()
        })
      },
      onFocus() {
        $.init()
      }
    },
    id
  )

  return context
}
