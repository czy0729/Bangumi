/*
 * @Author: czy0729
 * @Date: 2024-01-04 22:39:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 22:43:09
 */
import { useRunAfter } from '@utils/hooks'
import { EVENT_APP_TAB_PRESS } from '@src/navigations/tab-bar'
import { Ctx } from './types'

/** 超展开页面逻辑 */
export function useRakuenPage({ $, navigation }: Ctx) {
  useRunAfter(() => {
    $.init()

    navigation.addListener(`${EVENT_APP_TAB_PRESS}|Rakuen`, () => {
      $.onRefreshThenScrollTop()
    })
  })
}
