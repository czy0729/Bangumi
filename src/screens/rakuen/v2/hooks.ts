/*
 * @Author: czy0729
 * @Date: 2024-01-04 22:39:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:15:24
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 超展开页面逻辑 */
export function useRakuenPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $, navigation } = context

  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Rakuen`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  return context
}
