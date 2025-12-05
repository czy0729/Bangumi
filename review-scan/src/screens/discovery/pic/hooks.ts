/*
 * @Author: czy0729
 * @Date: 2025-06-09 14:59:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-09 15:09:20
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 图集页面逻辑 */
export function usePicPage(props: NavigationProps) {
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
