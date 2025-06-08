/*
 * @Author: czy0729
 * @Date: 2024-03-11 08:29:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 11:39:43
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** ICO 榜单页面逻辑 */
export function useTinygrailICOPage(props: NavigationProps) {
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
