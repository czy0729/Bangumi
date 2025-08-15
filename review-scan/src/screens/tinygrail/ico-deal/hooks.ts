/*
 * @Author: czy0729
 * @Date: 2024-03-01 23:39:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 12:07:04
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** ICO 详情页面逻辑 */
export function useTinygrailICODealPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      }
    },
    id
  )

  return context
}
