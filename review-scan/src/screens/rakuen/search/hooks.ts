/*
 * @Author: czy0729
 * @Date: 2024-01-18 07:26:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:13:14
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 小组搜索页面逻辑 */
export function useRakuenSearchPage(props: NavigationProps) {
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
