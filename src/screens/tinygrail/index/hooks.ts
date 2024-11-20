/*
 * @Author: czy0729
 * @Date: 2024-03-04 19:09:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:47:24
 */
import { StatusBar } from '@components'
import { _, useInitStore } from '@stores'
import { hm } from '@utils/fetch'
import { useFocusEffect, useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 小圣杯页面逻辑 */
export function useTinygrailPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
    hm('tinygrail', 'Tinygrail')
  })

  useFocusEffect(() => {
    setTimeout(() => {
      StatusBar.setBarStyle(_.select('dark-content', 'light-content'))
    }, 40)
  })

  return context
}
