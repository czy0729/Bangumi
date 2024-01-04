/*
 * @Author: czy0729
 * @Date: 2024-01-04 14:12:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:11:33
 */
import { _ } from '@stores'
import { androidDayNightToggle } from '@utils'
import { useFocusEffect, useRunAfter } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { Ctx } from './types'

/** 发现页面逻辑 */
export function useDiscoveryPage({ $, navigation }: Ctx) {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Discovery`, () => {
      $.onRefreshThenScrollTop()
    })
  })

  useFocusEffect(() => {
    androidDayNightToggle(_.isDark)
  })
}
