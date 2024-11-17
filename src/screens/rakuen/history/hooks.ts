/*
 * @Author: czy0729
 * @Date: 2024-11-17 16:19:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-17 16:19:20
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 帖子聚合页面逻辑 */
export function useRakuenHistoryPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
