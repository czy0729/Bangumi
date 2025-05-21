/*
 * @Author: czy0729
 * @Date: 2024-01-18 07:00:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:31:04
 */
import { useInitStore } from '@stores'
import { useKeyboardAdjustResize, usePageLifecycle } from '@utils/hooks'
import { NavigationProps } from '@types'
import store from './store'
import { Ctx } from './types'

/** 吐槽页面逻辑 */
export function useSayPage(props: NavigationProps) {
  const context = useInitStore<Ctx['$']>(props, store)
  const { id, $ } = context

  usePageLifecycle(
    {
      onLeaveComplete() {
        $.unmount()
      }
    },
    id
  )
  useKeyboardAdjustResize()

  return context
}
