/*
 * @Author: czy0729
 * @Date: 2024-01-04 16:41:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:42:12
 */
import { useEffect } from 'react'
import { uiStore } from '@stores'
import { useIsFocused, useRunAfter } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { Ctx } from './types'

/** 时间胶囊页面逻辑 */
export function useTimelinePage({ $, navigation }: Ctx) {
  const isFocused = useIsFocused()

  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Timeline`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  useEffect(() => {
    if (!isFocused) uiStore.closePopableSubject()
  }, [isFocused])
}
