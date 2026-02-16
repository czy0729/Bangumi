/*
 * @Author: czy0729
 * @Date: 2024-11-18 06:22:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 06:37:22
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 用户目录页面逻辑 */
export function useCatelogsPage(props: NavigationProps) {
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
