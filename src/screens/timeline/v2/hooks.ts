/*
 * @Author: czy0729
 * @Date: 2024-01-04 16:41:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:42:12
 */
import { uiStore, useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import store from './store'
import { REFRESH_EVENT_ID } from './ds'

import type { NavigationProps } from '@types'
import type { Ctx } from './types'

/** 时间胶囊页面逻辑 */
export function useTimelinePage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $, navigation } = context

  usePageLifecycle(
    {
      onEnter() {
        $.init()

        navigation.addListener(REFRESH_EVENT_ID, () => {
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
