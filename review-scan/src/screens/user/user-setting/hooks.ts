/*
 * @Author: czy0729
 * @Date: 2024-11-18 07:46:24
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-18 07:46:24
 */
import { useInitStore } from '@stores'
import { usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 个人设置页面逻辑 */
export function useUserSettingPage(props: NavigationProps) {
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
