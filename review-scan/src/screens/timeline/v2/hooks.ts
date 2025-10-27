/*
 * @Author: czy0729
 * @Date: 2024-01-04 16:41:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:42:12
 */
import { uiStore, useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 时间胶囊页面逻辑 */
export function useTimelinePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $, navigation } = context

  usePageLifecycle(
    {
      onEnter() {
        $.init()

        navigation.addListener(`${EVENT_APP_TAB_PRESS}|Timeline`, () => {
          $.onRefreshThenScrollTop()
        })
      },
      onBlur() {
        uiStore.closePopableSubject()
      }
    },
    id
  )

  return context
}
