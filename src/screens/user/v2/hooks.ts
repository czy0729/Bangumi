/*
 * @Author: czy0729
 * @Date: 2023-12-27 19:27:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 19:28:09
 */
import { StatusBar } from '@components'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { useRunAfter, useFocusEffect } from '@utils/hooks'
import { Ctx } from './types'

/** 条目页面逻辑 */
export function useUserPage($: Ctx['$'], navigation: Ctx['navigation']) {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|User`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  useFocusEffect(() => {
    setTimeout(() => {
      StatusBar.setBarStyle('light-content')
    }, 40)
  })
}
