/*
 * @Author: czy0729
 * @Date: 2024-11-18 07:37:50
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-18 07:37:50
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 用户的时间线页面逻辑 */
export function useUserTimelinePage(props: NavigationProps) {
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
