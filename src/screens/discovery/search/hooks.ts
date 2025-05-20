/*
 * @Author: czy0729
 * @Date: 2024-11-17 06:33:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 06:41:43
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 搜索页面逻辑 */
export function useSearchPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      onEnterComplete() {
        $.init()
      },
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )

  return context
}
