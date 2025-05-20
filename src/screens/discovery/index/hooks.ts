/*
 * @Author: czy0729
 * @Date: 2024-01-04 14:12:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 20:27:25
 */
import { _, useInitStore } from '@stores'
import { androidDayNightToggle } from '@utils'
import { usePageLifecycle } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 发现页面逻辑 */
export function useDiscoveryPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $, navigation } = context

  usePageLifecycle(
    {
      onEnter() {
        $.init()

        navigation.addListener(`${EVENT_APP_TAB_PRESS}|Discovery`, () => {
          $.onRefreshThenScrollTop()
        })
      },
      onFocus() {
        androidDayNightToggle(_.isDark)
      }
    },
    id
  )

  return context
}
