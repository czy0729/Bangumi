/*
 * @Author: czy0729
 * @Date: 2024-11-19 16:30:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:30:33
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 人物直达页面逻辑 */
export function useTinygrailSearchPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
