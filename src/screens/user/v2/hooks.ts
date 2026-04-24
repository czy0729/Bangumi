/*
 * @Author: czy0729
 * @Date: 2023-12-27 19:27:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-23 22:30:30
 */
import { StatusBar } from '@components'
import { uiStore, useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import store from './store'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 时光机页面逻辑 */
export function useUserPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $, navigation } = context

  usePageLifecycle(
    {
      onEnter() {
        $.init()

        navigation.addListener(`${EVENT_APP_TAB_PRESS}|User`, () => {
          $.onRefreshThenScrollTop()
        })
      },
      onFocus() {
        setTimeout(() => {
          StatusBar.setBarStyle('light-content')
        }, 40)
      },
      onBlur() {
        uiStore.closeAll()
      }
    },
    id
  )

  return context
}
