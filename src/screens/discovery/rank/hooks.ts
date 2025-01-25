/*
 * @Author: czy0729
 * @Date: 2024-11-16 09:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:38:32
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 排行榜页面逻辑 */
export function useRankPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}