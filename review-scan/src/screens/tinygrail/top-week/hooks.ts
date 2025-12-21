/*
 * @Author: czy0729
 * @Date: 2024-11-19 18:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 18:59:11
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 每周萌王页面逻辑 */
export function useTinygrailTopWeekPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
