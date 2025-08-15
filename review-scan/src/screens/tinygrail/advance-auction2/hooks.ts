/*
 * @Author: czy0729
 * @Date: 2024-11-19 06:29:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 06:37:45
 */
import { useInitStore } from '@stores'
import { useRunAfter } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 拍卖推荐 B 页面逻辑 */
export function useTinygrailAdvanceAuction2Page(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { $ } = context

  useRunAfter(() => {
    $.init()
  })

  return context
}
