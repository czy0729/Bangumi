/*
 * @Author: czy0729
 * @Date: 2024-01-04 22:39:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 06:02:59
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

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
