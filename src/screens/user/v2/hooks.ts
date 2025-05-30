/*
 * @Author: czy0729
 * @Date: 2023-12-27 19:27:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-31 11:05:52
 */
import { StatusBar } from '@components'
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

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
      }
    },
    id
  )

  return context
}
