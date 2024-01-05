/*
 * @Author: czy0729
 * @Date: 2024-01-05 20:34:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-05 20:35:48
 */
import { useFocusEffect, useRunAfter } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { Ctx } from './types'

/** 进度页面逻辑 */
export function useHomePage({ $, navigation }: Ctx) {
  useRunAfter(() => {
    $.updateInitialPage(navigation)

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Home`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  useFocusEffect(() => {
    $.init()
  })
}
