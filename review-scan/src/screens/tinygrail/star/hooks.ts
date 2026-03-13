/*
 * @Author: czy0729
 * @Date: 2024-03-09 05:13:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 18:31:46
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 通天塔页面逻辑 */
export function useTinygrailStarPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
